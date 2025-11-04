-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here
vim.o.background = "light"
vim.o.termguicolors = true

-- ensure local dirs for swap/backup/undo exist and use them
local data_home = vim.fn.stdpath("data")
local dirs = { "swap", "backup", "undo" }

for _, d in ipairs(dirs) do
  local dir = data_home .. "/" .. d
  if vim.fn.isdirectory(dir) == 0 then
    vim.fn.mkdir(dir, "p")
  end
end

vim.opt.directory:prepend(data_home .. "/swap//")
vim.opt.backupdir:prepend(data_home .. "/backup//")
vim.opt.undodir:prepend(data_home .. "/undo//")

vim.opt.backup = true
vim.opt.writebackup = true
vim.opt.swapfile = true
vim.opt.undofile = true
