import * as vscode from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";

export function executeMotionDown(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const lineCount = vimEditor.editor.document.lineCount;

    const currentPosition = vimEditor.editor.selection.active;
    const offset = currentPosition.line + amplifier >= lineCount ? lineCount - currentPosition.line : amplifier;

    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line + offset, currentPosition.character);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
}