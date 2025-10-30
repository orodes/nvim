vim.opt_local.tabstop = 4
vim.opt_local.shiftwidth = 4
vim.opt_local.softtabstop = 4
vim.opt_local.expandtab = true

vim.opt_local.colorcolumn = "80"

vim.cmd([[
  highlight OverLength ctermbg=darkred guibg=#592929
  match OverLength /\%81v.\+/
]])
