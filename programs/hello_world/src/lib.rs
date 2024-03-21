use anchor_lang::prelude::*;

declare_id!("5NjgwpGKcNsR5TNWSmCFTjR4PZ6kjZ4YqncqYJZccxFk");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
