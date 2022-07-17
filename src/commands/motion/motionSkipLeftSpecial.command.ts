import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandMotionSkipLeft } from "./motionSkipLeft.command";

export class CommandMotionSkipLeftSpecial extends SFVimCommand {
    constructor() {
        super("motion.skipEndSpecial", "Moves the cursor to the beginning of the previous word (including special characters)", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier !== 0) {
            return;
        }
    
        CommandMotionSkipLeft.instance().motionSkipLeft(vimEditor, amplifier, true);
    }
}