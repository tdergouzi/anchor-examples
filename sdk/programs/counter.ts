import * as anchor from "@coral-xyz/anchor";
import { IDL, Counter } from "../../target/types/counter";

export default class CounterService {
  private readonly program: anchor.Program<Counter>;
  constructor(
    private readonly provider: anchor.AnchorProvider,
    programId: anchor.web3.PublicKey,
    private counter: anchor.web3.PublicKey,
  ) {
    this.program = new anchor.Program(IDL, programId, provider);
  }

  async initialize(): Promise<any> {
    const counter = anchor.web3.Keypair.generate();
    this.counter = counter.publicKey;
    const signature = await this.program.methods
      .initialize()
      .accounts({
        counter: counter.publicKey,
        user: this.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([counter])
      .rpc();
    console.log("Initialize signature: ", signature);
    return { counter, signature };
  }

  async increment(): Promise<any> {
    const signature = await this.program.methods
      .increment()
      .accounts({
        counter: this.counter,
        user: this.provider.wallet.publicKey,
      })
      .rpc();
    console.log("Increment signature: ", signature);
    return { signature };
  }

  async fetchCounter(): Promise<any> {
    return await this.program.account.counter.fetch(this.counter);
  }
}
