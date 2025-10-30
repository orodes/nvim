return {
  {
    "projekt0n/github-nvim-theme",
    name = "github-theme",
    lazy = false,
    priority = 1000,
  },

  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = function()
        if vim.o.background == "light" then
          vim.cmd.colorscheme("github_light_default")
        else
          vim.cmd.colorscheme("github_dark_default")
        end
      end,
    },
  },
}
