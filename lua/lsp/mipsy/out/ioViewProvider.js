"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupIOView = void 0;
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
function setupIOView(context) {
    const allOutputs = {};
    let allWebviews = [];
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('mips.xavc.io', new IOViewProvider(context, addNewWebView)));
    context.subscriptions.push(vscode.debug.onDidStartDebugSession(e => {
        allOutputs[e.id] = [];
    }));
    context.subscriptions.push(vscode.debug.onDidTerminateDebugSession(e => {
        delete allOutputs[e.id];
    }));
    function addNewWebView(webviewView) {
        allWebviews.push(webviewView.webview);
        context.subscriptions.push(webviewView.onDidDispose(() => {
            allWebviews = allWebviews.filter(webview => webview !== webviewView.webview);
        }));
        webviewView.webview.onDidReceiveMessage(message => {
            if (message.command === 'req_full') {
                sendFullUpdate(webviewView.webview);
            }
        });
    }
    function sendFullUpdate(webview) {
        const initialBody = [];
        const message = {
            command: 'full',
            body: initialBody
        };
        if (vscode.debug.activeDebugSession) {
            message.body = allOutputs[vscode.debug.activeDebugSession.id] || [];
        }
        webview.postMessage(message);
    }
    context.subscriptions.push(vscode.debug.onDidChangeActiveDebugSession(e => {
        allWebviews.forEach(webview => {
            sendFullUpdate(webview);
        });
    }));
    context.subscriptions.push(vscode.debug.onDidReceiveDebugSessionCustomEvent(e => {
        if (e.session.type !== 'mipsy-1') {
            return;
        }
        if (e.event !== 'mipsyOutput') {
            return;
        }
        allOutputs[e.session.id].push(...e.body.segments);
        if (e.session.id === vscode.debug.activeDebugSession?.id) {
            allWebviews.forEach(webview => {
                webview.postMessage({
                    command: 'incremental',
                    body: e.body.segments
                });
            });
        }
    }));
}
exports.setupIOView = setupIOView;
class IOViewProvider {
    constructor(extensionContext, addNewWebviewView) {
        this.extensionContext = extensionContext;
        this.addNewWebviewView = addNewWebviewView;
    }
    resolveWebviewView(webviewView, context, token) {
        webviewView.webview.options = {
            enableScripts: true
        };
        webviewView.webview.html = fs.readFileSync(this.extensionContext.asAbsolutePath(path.join('src', 'ioView.html')), { encoding: 'utf-8' });
        this.addNewWebviewView(webviewView);
    }
}
//# sourceMappingURL=ioViewProvider.js.map