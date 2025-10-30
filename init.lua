require("config.lazy")

-- defer socket setup until after LazyVim is ready
vim.api.nvim_create_autocmd("User", {
  pattern = "VeryLazy",
  callback = function()
    local socket_path = "/tmp/nvim-" .. vim.fn.getpid()
    pcall(vim.fn.serverstop, vim.v.servername)
    vim.fn.serverstart(socket_path)
    vim.env.NVIM_LISTEN_ADDRESS = socket_path
  end,
})

-- system theme detection
local function set_theme_from_system()
  local handle = io.popen("defaults read -g AppleInterfaceStyle 2>/dev/null")
  if not handle then
    return
  end
  local result = handle:read("*a")
  handle:close()

  if result and result:match("Dark") then
    vim.o.background = "dark"
    vim.cmd.colorscheme("github_dark_default")
  else
    vim.o.background = "light"
    vim.cmd.colorscheme("github_light_default")
  end
end

set_theme_from_system()
