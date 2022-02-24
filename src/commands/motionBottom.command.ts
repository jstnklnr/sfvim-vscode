import * as vscode from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";

export function executeMotionBottom(vimEditor: SFVimEditor) {
    const lineCount = vimEditor.editor.document.lineCount;
    const currentPosition = vimEditor.editor.selection.active;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;

    const newPosition = vimEditor.editor.selection.active.with(lineCount - 1, character);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
}