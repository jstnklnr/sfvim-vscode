import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import * as vscode from "vscode";

export class CommandShiftLineDown extends SFVimCommand {
    constructor() {
        super("line.moveDown", "Shifts the selected lines down", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(_: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        for(let i = 0; i < amplifier; i++) {
            vscode.commands.executeCommand("editor.action.moveLinesDownAction");
        }
    }
}