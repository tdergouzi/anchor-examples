use anchor_lang::prelude::*;

declare_id!("3iTFPXvhgoV146eyJGHbYYN8GxfkkiRnvu4iB4AaG779");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
