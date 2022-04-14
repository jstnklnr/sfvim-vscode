import { Selection } from "vscode";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRightPosition } from "../../utilities/selection.util";
import { CommandModeInsert } from "./modeInsert.command";

export class CommandModeInsertAppend extends SFVimCommand {
    private static _instance: CommandModeInsertAppend;

    constructor() {
        super("mode.append", "Switches the current editor to INSERT mode and puts the cursor behind the currently selected character", SFVimMode.NORMAL);
        CommandModeInsertAppend._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandModeInsertAppend {
        return CommandModeInsertAppend._instance || new CommandModeInsertAppend();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const position = getRightPosition(vimEditor.editor.selection.active);
        vimEditor.editor.selection = new Selection(position, position);
        CommandModeInsert.instance().execute(vimEditor, amplifier);
    }
}