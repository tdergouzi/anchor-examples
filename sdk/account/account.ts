import * as anchor from "@coral-xyz/anchor";

export default class Account {
  constructor(private readonly provider: anchor.Provider) {}

  async createAccount(
    fromPubkey: anchor.web3.PublicKey,
    space: number,
    programId: anchor.web3.PublicKey
  ): Promise<any> {
    const counter = anchor.web3.Keypair.generate();
    const rentExemptionAmount =
      await this.provider.connection.getMinimumBalanceForRentExemption(space);
    const createAccountParams = {
      fromPubkey: fromPubkey,
      newAccountPubkey: counter.publicKey,
      space: space,
      lamports: rentExemptionAmount,
      programId: programId,
    };
    const transaction = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.createAccount(createAccountParams)
    );
    const signature = await this.provider.sendAndConfirm(transaction, [
      counter,
    ]);
    console.log("Create counter account signature: ", signature);

    return { counter, signature };
  }

  async getAccountInfo(counter: anchor.web3.PublicKey): Promise<any> {
    const counterInfo = await this.provider.connection.getAccountInfo(counter);
    return counterInfo;
  }
}
