import * as vscode from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";

export function executeMotionRight(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const currentPosition = vimEditor.editor.selection.active;
    const lineLength = vimEditor.editor.document.lineAt(currentPosition.line).text.length;
    let newCharacter = currentPosition.character + amplifier;

    if(newCharacter >= lineLength) {
        newCharacter = lineLength - 1;
    }

    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line, newCharacter);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}