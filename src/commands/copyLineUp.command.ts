import { SFVimEditor } from "../types/SFVimEditor";
import * as vscode from "vscode";

export function executeCopyLineUp(_: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    for(let i = 0; i < amplifier; i++) {
        vscode.commands.executeCommand("editor.action.copyLinesUpAction");
    }
}