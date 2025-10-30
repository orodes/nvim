"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const decompileView_1 = require("./decompileView");
const ioViewProvider_1 = require("./ioViewProvider");
const launchDebug_1 = require("./launchDebug");
const lspClient_1 = require("./lspClient");
const memoryViewer_1 = require("./memoryViewer");
function activate(context) {
    console.log('Starting! How exciting!');
    (0, lspClient_1.startLSP)(context);
    (0, decompileView_1.setupDecompilationButton)(context);
    (0, launchDebug_1.setupDebugButton)(context);
    (0, memoryViewer_1.setupMemoryButton)(context);
    (0, ioViewProvider_1.setupIOView)(context);
    (0, launchDebug_1.setupSendInputButton)(context);
}
exports.activate = activate;
function deactivate() {
    (0, lspClient_1.deactivateClient)();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map