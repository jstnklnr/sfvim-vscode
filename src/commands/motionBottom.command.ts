import * as vscode from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";

export function executeMotionBottom(vimEditor: SFVimEditor) {
    const lineCount = vimEditor.editor.document.lineCount;
    const currentPosition = vimEditor.editor.selection.active;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;

    const newPosition = vimEditor.editor.selection.active.with(lineCount - 1, character);
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }

    vimEditor.editor.selection = new vscode.Selection(anchor, newPosition);
    //vimEditor.editor.selections = [new vscode.Selection(anchor, newPosition), new vscode.Selection(anchor.with(anchor.line, anchor.character - 2), anchor.with(anchor.line, anchor.character - 1))];
}