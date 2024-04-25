import { Keypair } from "@solana/web3.js";
import { readFileSync } from "fs";
import * as bs58 from "bs58";

export function idToKeypair(path: string): Keypair {
  // Read the id.json file
  const data = readFileSync(path, "utf-8");

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Convert the JSON data into a keypair
  const keypair = Keypair.fromSecretKey(new Uint8Array(jsonData));
  // console.log(keypair.publicKey.toBase58());
  // console.log(bs58.encode(keypair.secretKey));
  return keypair;

}
