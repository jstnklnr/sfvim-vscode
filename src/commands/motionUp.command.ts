import * as vscode from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";

export function executeMotionUp(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }
    
    const currentPosition = vimEditor.editor.selection.active;
    const offset = currentPosition.line - amplifier < 0 ? currentPosition.line : amplifier;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;

    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line - offset, character);
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }

    vimEditor.editor.selection = new vscode.Selection(anchor, newPosition);
}