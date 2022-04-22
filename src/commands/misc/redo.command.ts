import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import * as vscode from "vscode";

export class CommandRedo extends SFVimCommand {
    constructor() {
        super("redo", "Redoes the last undone action", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
        
        (async () => {
            for(let i = 0; i < amplifier; i++) {
                await vscode.commands.executeCommand("redo");
            }
    
            handleSelection(vimEditor, vimEditor.editor.selection.active);
        })();
    }
}