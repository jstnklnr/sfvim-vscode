import * as vscode from "vscode";

export function executeMotionDown(editor: vscode.TextEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const lineCount = editor.document.lineCount;

    const currentPosition = editor.selection.active;
    const offset = currentPosition.line + amplifier >= lineCount ? lineCount - currentPosition.line : amplifier;

    const newPosition = editor.selection.active.with(currentPosition.line + offset, currentPosition.character);
    editor.selection = new vscode.Selection(newPosition, newPosition);
}