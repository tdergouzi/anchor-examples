import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloWorld } from "../target/types/hello_world";

describe("hello_world", () => {
  // Configure the client to use the local cluster.
  let provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.HelloWorld as Program<HelloWorld>;

  const authority = provider.wallet.publicKey;
  let [helloWorld] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("hello-world")],
    program.programId
  )
  // console.log("===========helloworld", helloWorld.toBase58());
  // console.log("===========programId", program.programId.toBase58())

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize("Hello My Friend!").accounts({
      helloWorld,
      authority,
      systemProgram: anchor.web3.SystemProgram.programId
    }).rpc();

    console.log("Your transaction signature", tx);

    const accountState = await program.account.helloWorld.fetch(helloWorld);
    console.log("account state: ", accountState);
  });

  it('get hello world!', async () => {
    const tx = await program.methods.update('Hello My Life!').accounts({
      helloWorld
    }).rpc()

    console.log("Your transaction signature", tx);

    const accountState = await program.account.helloWorld.fetch(helloWorld);
    console.log("account state: ", accountState);
  })

  it('read account name', async () => {
    const accountState = await program.account.helloWorld.fetch(helloWorld);
    console.log("account state: ", accountState);
  })
});
