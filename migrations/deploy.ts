// Migrations are an early feature. Currently, they're nothing more than this
// single deploy script that's invoked from the CLI, injecting a provider
// configured from the workspace's Anchor.toml.

import anchor from "@coral-xyz/anchor";

async function main() {
  // Configure client to use the provider.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Add your deploy script here.
  
}

main()