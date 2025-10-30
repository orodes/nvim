-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here
vim.keymap.set("i", "jk", "<ESC>", { silent = true })

vim.keymap.set({ "n", "t" }, "<C-`>", function()
  Snacks.terminal.toggle("zellij", { win = { position = "right" } })
end, { desc = "Toggle terminal right" })

vim.keymap.set("n", "<C-\\>", function()
  vim.cmd("vsplit")
end, { desc = "Vertical split current window" })

vim.keymap.set("n", "<leader>ub", function()
  if vim.o.background == "dark" then
    vim.o.background = "light"
    vim.cmd.colorscheme("github_light_default")
  else
    vim.o.background = "dark"
    vim.cmd.colorscheme("github_dark_default")
  end
end, { desc = "Toggle GitHub light/dark theme" })
