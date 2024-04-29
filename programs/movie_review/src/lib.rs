use anchor_lang::prelude::*;

declare_id!("33b7Zs37xme6isq41o8oAnJnAfcuSP86iFPHg9bpbdb1");

#[program]
pub mod movie_review {
    use super::*;

    pub fn add_movie_review(
        ctx: Context<AddMovieReview>,
        title: String,
        description: String,
        rating: u8,
    ) -> Result<()> {
        msg!("Create Movie Review Account");
        msg!("Title: {}", title);
        msg!("Description: {}", description);
        msg!("Rating: {}", rating);
        let movie_review = &mut ctx.accounts.movie_review;
        movie_review.reviewer = ctx.accounts.initializer.key();
        movie_review.title = title;
        movie_review.rating = rating;
        movie_review.description = description;
        Ok(())
    }

    pub fn update_movie_reviw(
        ctx: Context<UpdateMovieReviw>,
        title: String,
        description: String,
        rating: u8
    ) -> Result<()> {
        msg!("Update Movie Review Account");
        msg!("Title: {}", title);
        msg!("Description: {}", description);
        msg!("Rating: {}", rating);
        let movie_review = &mut ctx.accounts.movie_review;
        movie_review.rating = rating;
        movie_review.description = description;
        Ok(())
    }

    pub fn close(_ctx: Context<Close>) -> Result<()> {
        Ok(())
    }
}

#[account]
pub struct MovieAccountState {
    pub reviewer: Pubkey,
    pub rating: u8,
    pub title: String,
    pub description: String,
}

#[derive(Accounts)]
#[instruction(title: String, description: String)]
pub struct AddMovieReview<'info> {
    #[account(
        init,
        payer = initializer,
        space = 8 + 32 + 1 + 4 + title.len() + 4 + description.len(),
        seeds = [title.as_bytes(), initializer.key().as_ref()],
        bump
    )]
    pub movie_review: Account<'info, MovieAccountState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String, description: String)]
pub struct UpdateMovieReviw<'info> {
    #[account(
        mut,
        realloc = 8 + 32 + 1 + 4 + title.len() + 4 + description.len(),
        realloc::payer = initializer,
        realloc::zero = true,
    )]
    pub movie_review: Account<'info, MovieAccountState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Close<'info> {
    #[account(mut, close = reviewer, has_one = reviewer)]
    movie_review: Account<'info, MovieAccountState>,
    #[account(mut)]
    reviewer: Signer<'info>,
}