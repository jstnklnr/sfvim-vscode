import { SFVimEditor } from "../types/SFVimEditor";
import * as vscode from "vscode";

export function executeSuggestion(_: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    vscode.commands.executeCommand("editor.action.quickFix");
}