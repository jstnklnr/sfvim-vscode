import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { CommandMotionJump } from "./motionJump.command";

export class CommandMotionMiddleView extends SFVimCommand {
    constructor() {
        super("motion.middleView", "Moves the cursor to the middle line of the current viewport", SFVimMode.NORMAL | SFVimMode.VISUAL);
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
        CommandMotionJump.instance().execute(vimEditor, view.start.line + Math.floor((view.end.line - view.start.line) / 2) + 1);
    }
}