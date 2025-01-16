use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("MemeCoinGenie111111111111111111111111111111111");

#[program]
pub mod meme_coin_contract {
    use super::*;

    pub fn create_meme_coin(ctx: Context<CreateMemeCoin>, name: String) -> ProgramResult {
        let mint = &mut ctx.accounts.mint;
        let token_program = &ctx.accounts.token_program;
        
        let rent = Rent::get()?;
        let mint_lamports = rent.minimum_balance(Mint::LEN);
        
        // Create a new mint for the meme coin
        token::mint_to(
            ctx.accounts.into_mint_to_context(),
            1_000_000_000, // Initial amount of meme coin
        )?;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMemeCoin<'info> {
    #[account(init, payer = user, space = Mint::LEN)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

impl<'info> CreateMemeCoin<'info> {
    fn into_mint_to_context(&self) -> CpiContext<'_, '_, '_, 'info, token::MintTo<'info>> {
        let cpi_accounts = token::MintTo {
            mint: self.mint.to_account_info(),
            to: self.mint.to_account_info(),
            authority: self.user.to_account_info(),
        };
        CpiContext::new(self.token_program.to_account_info(), cpi_accounts)
    }
}
