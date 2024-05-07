import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { expect } from "chai";

describe("counter", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Counter as Program<Counter>;

  const user = provider.wallet.publicKey;
  const counter = anchor.web3.Keypair.generate();
  //   console.log("===========counter", counter.publicKey.toBase58());
  //   console.log("===========programId", program.programId.toBase58());

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        counter: counter.publicKey,
        user,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([counter])
      .rpc();

    console.log("Your transaction signature", tx);

    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.eq(0);
  });

  it("Increment", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counter.publicKey,
        user: user,
      })
      .rpc();

    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.eq(1);
  });
});
