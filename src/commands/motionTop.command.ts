import * as vscode from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";

export function executeMotionTop(vimEditor: SFVimEditor) {
    const currentPosition = vimEditor.editor.selection.active;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;

    const newPosition = vimEditor.editor.selection.active.with(0, character);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
}