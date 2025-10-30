return {
  {
    "neovim/nvim-lspconfig",
    optional = true,
    opts = function(_, opts)
      local lspconfig = require("lspconfig")

      local mipsy = dofile(vim.fn.expand("~/.config/nvim/lua/lsp/mipsy/mipsy.lua"))
      mipsy.setup()

      lspconfig.mipsy_editor_features.setup({})
    end,
  },

  -- Extend LazyVim's built-in DAP configuration
  {
    "mfussenegger/nvim-dap",
    optional = true,
    opts = function()
      local dap = require("dap")

      dap.adapters["mipsy-1"] = {
        type = "executable",
        command = "node",
        args = { vim.fn.expand("~/.config/nvim/lua/lsp/mipsy/out/mipsDebugAdapter.js"), "--stdio" },
      }

      dap.configurations.mips = {
        {
          name = "Launch MIPSY program",
          type = "mipsy-1",
          request = "launch",
          program = function()
            local file = vim.fn.input("Path to MIPS program: ", vim.fn.expand("%:p"), "file")
            return { path = file }
          end,
          cwd = "${workspaceFolder}",
          stopOnEntry = false,
        },
      }
    end,
  },
}
