import * as vscode from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";

export function executeMotionLeft(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const currentPosition = vimEditor.editor.selection.active;
    
    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line, currentPosition.character - amplifier);
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }

    vimEditor.editor.selection = new vscode.Selection(anchor, newPosition);
    vimEditor.editor.selection.isReversed = true;
    vimEditor.tags.set("lastCharacter", newPosition.character);
}