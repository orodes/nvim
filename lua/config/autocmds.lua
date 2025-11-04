-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua
--
-- Add any additional autocmds here
-- with `vim.api.nvim_create_autocmd`
--
-- Or remove existing autocmds by their group name (which is prefixed with `lazyvim_` for the defaults)
-- e.g. vim.api.nvim_del_augroup_by_name("lazyvim_wrap_spell")
--
vim.api.nvim_create_autocmd("OptionSet", {
  pattern = "background",
  callback = function()
    local bg = vim.o.background
    local theme = (bg == "light") and "GitHub" or "Visual Studio Dark+"
    vim.env.BAT_THEME = theme
    vim.fn.writefile({ theme }, vim.fn.expand("$HOME/.cache/nvim_theme"))
    vim.fn.jobstart({ "fish", "-c", "source ~/.config/fish/conf.d/bat-theme.fish" })
  end,
})
