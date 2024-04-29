import * as anchor from "@coral-xyz/anchor";
import { IDL } from "../target/types/counter";
import * as bs58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // Configure client to use the provider.
  const connnection = new anchor.web3.Connection(process.env.SOLANA_RPC);
  const keypair = anchor.web3.Keypair.fromSecretKey(
    bs58.decode(process.env.PRIVATE_KEY)
  );
  const wallet = new anchor.Wallet(keypair);
  const provider = new anchor.AnchorProvider(connnection, wallet, {
    commitment: "confirmed",
    preflightCommitment: "confirmed",
  });

  const programId = new anchor.web3.PublicKey(
    "GQpWSjSsWdo9Mbpuc7WP8m6CW742JKowjXNsr28ShTDm"
  );
  const program = new anchor.Program(IDL, programId, provider);

  const counter = anchor.web3.Keypair.generate();

  // Initialize
  const initTx = await program.methods
    .initialize()
    .accounts({
      counter: counter.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([counter])
    .rpc();
  console.log("Initialize signature: ", initTx);

  // const account = await program.account.counter.fetch();
}

main();
