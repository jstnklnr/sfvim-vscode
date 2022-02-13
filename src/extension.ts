import * as vscode from 'vscode';
import { handleKeys, loadConfig, setup } from './handlers/key.handler';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('type', (event) => {
		handleKeys(event);
        return vscode.commands.executeCommand('default:type', event);
    });

	setup();
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(loadConfig));
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}