use anchor_lang::prelude::*;
// use program::HelloWorld;

declare_id!("5NjgwpGKcNsR5TNWSmCFTjR4PZ6kjZ4YqncqYJZccxFk");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: String) -> Result<()> {
        msg!("{}", data);

        *ctx.accounts.hello_world = HelloWorld {
            authority: *ctx.accounts.authority.key,
            data
        };

        Ok(())
    }

    pub fn update(ctx: Context<UpdateHelloWorld>, data: String) -> Result<()> {
        ctx.accounts.hello_world.data = data;
        msg!("{}", ctx.accounts.hello_world.data);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + HelloWorld::INIT_SPACE,
        seeds = [b"hello-world"],
        bump
    )]
    pub hello_world: Account<'info, HelloWorld>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
#[derive(InitSpace)]
pub struct HelloWorld {
    pub authority: Pubkey,
    #[max_len(100)]
    pub data: String
}

#[derive(Accounts)]
pub struct UpdateHelloWorld<'info> {
    #[account(
        mut,
        seeds = [b"hello-world"],
        bump
    )]
    pub hello_world: Account<'info, HelloWorld>,
    #[account(mut)]
    pub authority: Signer<'info>
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
    #[msg("Cannot get the bump.")]
    CannotGetBump,
}