import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "sfvim-vscode" is now active!');

	let disposable = vscode.commands.registerCommand('sfvim-vscode.helloWorld', () => {
		vscode.window.showInformationMessage(`Hello World from SFVim! ${vscode.window.activeTextEditor?.selection.active.line}`);
		let newPosition = vscode.window.activeTextEditor?.selection.active.with(3, 2);
		let editor = vscode.window.activeTextEditor;
		editor!.selection = new vscode.Selection(newPosition!, newPosition!);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
