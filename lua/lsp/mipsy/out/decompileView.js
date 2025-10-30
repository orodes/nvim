"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDecompilationButton = exports.DecompileView = exports.DECOMPILE_SCHEME = void 0;
const vscode = require("vscode");
const mipsy_vscode_1 = require("../mipsy_vscode/pkg/mipsy_vscode");
exports.DECOMPILE_SCHEME = 'mips-decompile';
class DecompileView {
    constructor() {
        this.onDidChangeEmitter = new vscode.EventEmitter();
        this.onDidChange = this.onDidChangeEmitter.event;
    }
    async provideTextDocumentContent(uri, token) {
        const originalUri = Buffer.from(uri.path.split('/', 1)[0], 'base64url').toString('utf8');
        let sourceDocument;
        try {
            sourceDocument = await vscode.workspace.openTextDocument(vscode.Uri.parse(originalUri));
        }
        catch (err) {
            return `Couldn't open file! ${originalUri}`;
        }
        if (sourceDocument.languageId !== 'mips') {
            return `Cannot decompile non-mips file (language is ${sourceDocument.languageId})`;
        }
        const filename = uri.path.split('/', 2)[1]?.replace('Decompiled: ', '') || 'mips.s';
        // TODO: make this call on the language server side
        const decompiled = (0, mipsy_vscode_1.decompile_source)(sourceDocument.getText(), filename);
        return `Decompilation of ${filename}:\n${decompiled}`.trimEnd() + '\n';
    }
}
exports.DecompileView = DecompileView;
function setupDecompilationButton(context) {
    const decompileProver = new DecompileView();
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(exports.DECOMPILE_SCHEME, decompileProver));
    function filenameFromURI(uri) {
        // this is somewhat dodgy, but is only for display purposes so doesn't really matter
        const match = uri.path.match(/[^[\\/]*$/);
        return match ? match[0] : 'mips.s';
    }
    const filesToWatch = new Set();
    context.subscriptions.push(vscode.commands.registerCommand('mips.decompileCurrent', async (file) => {
        if (!file) {
            file = vscode.window.activeTextEditor?.document.uri;
            if (!file) {
                return;
            }
        }
        if (file.scheme === exports.DECOMPILE_SCHEME) {
            vscode.window.showErrorMessage('Cannot decompile a decompilation!');
            return;
        }
        const encodedUrl = Buffer.from(file.toString(), 'utf8').toString('base64url');
        const encodedUri = vscode.Uri.from({
            scheme: exports.DECOMPILE_SCHEME, authority: '',
            path: `${encodedUrl}/Decompiled: ${filenameFromURI(file)}`
        });
        if (!filesToWatch.has(file.toString())) {
            const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(file, '*'));
            context.subscriptions.push(watcher);
            watcher.onDidChange(() => {
                decompileProver.onDidChangeEmitter.fire(encodedUri);
            });
            filesToWatch.add(file.toString());
        }
        const doc = await vscode.workspace.openTextDocument(encodedUri);
        await vscode.languages.setTextDocumentLanguage(doc, 'mips');
        await vscode.window.showTextDocument(doc, { preview: false });
    }));
}
exports.setupDecompilationButton = setupDecompilationButton;
//# sourceMappingURL=decompileView.js.map