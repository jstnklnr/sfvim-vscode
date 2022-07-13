import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";

export class CommandModeInsert extends SFVimCommand {
    private static _instance: CommandModeInsert;

    constructor() {
        super("mode.insert", "Switches the current editor to INSERT mode and puts the cursor in front of the currently selected character", SFVimMode.NORMAL);
        CommandModeInsert._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandModeInsert {
        return CommandModeInsert._instance || new CommandModeInsert();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier !== 0) {
            return;
        }
    
        vimEditor.changeMode(SFVimMode.INSERT);
        vimEditor.callStatusCallback();
    }
}