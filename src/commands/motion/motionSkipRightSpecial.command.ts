import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandMotionSkipRight } from "./motionSkipRight.command";

export class CommandMotionSkipRightSpecial extends SFVimCommand {
    constructor() {
        super("motion.skipRightSpecial", "Moves the cursor to the beginning of the next word (including special characters)", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandMotionSkipRight.instance().motionSkipRight(vimEditor, amplifier, true);
    }
}