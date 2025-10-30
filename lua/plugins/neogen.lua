return {
  "danymat/neogen",
  dependencies = { "nvim-treesitter/nvim-treesitter" },
  config = function()
    require("neogen").setup({
      enabled = true,
      languages = {
        javascript = {
          template = { annotation_convention = "jsdoc" },
        },
        typescript = {
          template = { annotation_convention = "jsdoc" },
        },
      },
    })
  end,
  keys = {
    { "<leader>cd", ":Neogen<CR>", desc = "Generate JSDoc" },
  },
}
