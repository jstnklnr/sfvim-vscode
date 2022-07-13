import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandMotionRealLineEnd } from "../motion/motionRealLineEnd.command";
import { CommandModeInsertAppend } from "./modeInsertAppend.command";

export class CommandModeInsertAppendLineEnd extends SFVimCommand {
    constructor() {
        super("mode.appendLineEnd", "Switches the current editor to INSERT mode and puts the cursor at the end of the line", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier !== 0) {
            return;
        }

        CommandMotionRealLineEnd.instance().moveLast(vimEditor).then(() => {
            CommandModeInsertAppend.instance().execute(vimEditor, amplifier);
        });
    }
}