import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import * as vscode from "vscode";

export class CommandShiftLineUp extends SFVimCommand {
    constructor() {
        super("line.moveUp", "Shifts the selected lines up", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(_: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        for(let i = 0; i < amplifier; i++) {
            vscode.commands.executeCommand("editor.action.moveLinesUpAction");
        }
    }
}