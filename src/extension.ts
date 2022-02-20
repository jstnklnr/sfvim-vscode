import * as vscode from 'vscode';
import { SFVim } from './sfvim';

export function activate(context: vscode.ExtensionContext) {
	new SFVim(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}