import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import * as vscode from "vscode";

export class CommandSuggestion extends SFVimCommand {
    constructor() {
        super("suggestion", "Shows a list of suggested actions", SFVimMode.NORMAL);
    }

    public execute(_: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        vscode.commands.executeCommand("editor.action.quickFix");
    }
}