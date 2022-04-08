import { SFVimEditor } from "../types/SFVimEditor";
import * as vscode from "vscode";
import { handleSelection } from "../handlers/selection.handler";

export function executeUndo(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    (async () => {
        if(vimEditor.usedInsert && vimEditor.sfvim.sfvimConfig.get("doubleUndoAfterInsert")) {
            amplifier++;
        }

        for(let i = 0; i < amplifier; i++) {
            await vscode.commands.executeCommand("undo");
        }

        handleSelection(vimEditor, vimEditor.editor.selection.active);
    })();
}