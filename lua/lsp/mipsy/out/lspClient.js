"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateClient = exports.startLSP = void 0;
const vscode = require("vscode");
const path = require("path");
const node_1 = require("vscode-languageclient/node");
let client;
function startLSP(context) {
    console.log(context.asAbsolutePath(path.join('out', 'server.js')));
    let serverModule = context.asAbsolutePath(path.join('out', 'server.js'));
    let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    let serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: debugOptions
        }
    };
    let clientOptions = {
        documentSelector: [{
                language: 'mips'
            }]
    };
    console.log('config ' + JSON.stringify(vscode.workspace.getConfiguration('mips')));
    client = new node_1.LanguageClient('MipsLangServ', 'Mipsy language server (xav)', serverOptions, clientOptions);
    client.start();
}
exports.startLSP = startLSP;
async function deactivateClient() {
    if (client) {
        return await client.stop();
    }
}
exports.deactivateClient = deactivateClient;
//# sourceMappingURL=lspClient.js.map