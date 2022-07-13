import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandMotionLineStart } from "../motion/motionLineStart.command";
import { CommandModeInsert } from "./modeInsert.command";

export class CommandModeInsertLineStart extends SFVimCommand {
    constructor() {
        super("mode.insertLineStart", "Switches the current editor to INSERT mode and puts the cursor in front of the first character of the line", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier !== 0) {
            return;
        }

        CommandMotionLineStart.instance().execute(vimEditor, 0);
        CommandModeInsert.instance().execute(vimEditor, amplifier);
    }
}