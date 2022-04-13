import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { CommandMotionJump } from "./motionJump.command";

export class CommandMotionHighestView extends SFVimCommand {
    constructor() {
        super("motion.highestView", "Moves the cursor to the highest line of the current viewport", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const visibleRanges = vimEditor.editor.visibleRanges;
    
        if(visibleRanges === undefined || visibleRanges.length == 0) {
            return;
        }
    
        const view = visibleRanges[0];
        CommandMotionJump.instance().execute(vimEditor, view.start.line + 1);
    }
}