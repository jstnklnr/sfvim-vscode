"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log('Congratulations, your extension "sfvim-vscode" is now active!');
    let disposable = vscode.commands.registerCommand('sfvim-vscode.helloWorld', () => {
        vscode.window.showInformationMessage(`Hello World from SFVim! ${vscode.window.activeTextEditor?.selection.active.line}`);
        let newPosition = vscode.window.activeTextEditor?.selection.active.with(3, 2);
        let editor = vscode.window.activeTextEditor;
        editor.selection = new vscode.Selection(newPosition, newPosition);
        editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
        vscode.commands.registerCommand("type", e => {
            e.preventDefault();
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map