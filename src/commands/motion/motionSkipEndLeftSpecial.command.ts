import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandMotionSkipEndLeft } from "./motionSkipEndLeft.command";

export class CommandMotionSkipEndLeftSpecial extends SFVimCommand {
    constructor() {
        super("motion.skipEndLeftSpecial", "Moves the cursor to the end of the previous word (including special characters)", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandMotionSkipEndLeft.instance().motionSkipEndLeft(vimEditor, amplifier, true);
    }
}