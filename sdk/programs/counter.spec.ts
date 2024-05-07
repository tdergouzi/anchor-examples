import * as anchor from "@coral-xyz/anchor";
import * as bs58 from "bs58";
import dotenv from "dotenv";
import CounterService from "./counter";

dotenv.config();

async function main() {
    // Connection
    const connnection = new anchor.web3.Connection(process.env.SOLANA_RPC);

    // Wallet
    const keypair = anchor.web3.Keypair.fromSecretKey(
      bs58.decode(process.env.PRIVATE_KEY)
    );
    const wallet = new anchor.Wallet(keypair);

    // Provider
    const provider = new anchor.AnchorProvider(connnection, wallet, {
      commitment: "confirmed",
      preflightCommitment: "confirmed",
    });

    // ProgramId
    const programId = new anchor.web3.PublicKey(
      "CgXMJ7jcvaSnpBD46PnQAmBk2XrGQEpAQFqL1h1NBJaS"
    );
    const counter = new anchor.web3.PublicKey('GjDe2Wo5KLHWD62pKa2MJ7pCPaf6N7xmMr7WHJHwCaR4')

    // Program Service
    const counterService = new CounterService(provider, programId, counter);

    // Function fetchCounter
    const fetchRes = await counterService.fetchCounter();
    console.log(fetchRes.count);

  }
  
  main();