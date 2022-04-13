import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandMotionSkipEndRight } from "./motionSkipEndRight.command";

export class CommandMotionSkipEndRightSpecial extends SFVimCommand {
    constructor() {
        super("motion.skipEndRightSpecial", "Moves the cursor to the end of the next word (including special characters)", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandMotionSkipEndRight.instance().motionSkipEndRight(vimEditor, amplifier, true);
    }
}