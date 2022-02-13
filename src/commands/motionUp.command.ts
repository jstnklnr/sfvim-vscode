import * as vscode from "vscode";

export function executeMotionUp(editor: vscode.TextEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }
    
    const currentPosition = editor.selection.active;
    const offset = currentPosition.line - amplifier < 0 ? currentPosition.line : amplifier;

    const newPosition = editor.selection.active.with(currentPosition.line - offset, currentPosition.character);
    editor.selection = new vscode.Selection(newPosition, newPosition);
}