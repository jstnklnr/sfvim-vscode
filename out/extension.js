"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const key_handler_1 = require("./handlers/key.handler");
function activate(context) {
    const disposable = vscode.commands.registerCommand('type', (event) => {
        (0, key_handler_1.handleKeys)(event);
        return vscode.commands.executeCommand('default:type', event);
    });
    (0, key_handler_1.setup)();
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(key_handler_1.loadConfig));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map