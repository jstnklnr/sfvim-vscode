import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { CommandMotionJump } from "./motionJump.command";

export class CommandMotionLowestView extends SFVimCommand {
    constructor() {
        super("motion.lowestView", "Moves the cursor to the lowest line of the current viewport", SFVimMode.NORMAL | SFVimMode.VISUAL);
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
        CommandMotionJump.instance().execute(vimEditor, view.end.line + 1);
    }
}