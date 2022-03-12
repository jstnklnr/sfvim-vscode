import { Selection } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { getRightPosition } from "../utilities/selection.util";
import { executeModeChangeInsert } from "./modeInsert.command";

export function executeModeChangeInsertAppend(vimEditor: SFVimEditor) {
    const position = getRightPosition(vimEditor.editor.selection.active);
    vimEditor.editor.selection = new Selection(position, position);
    executeModeChangeInsert(vimEditor);
}