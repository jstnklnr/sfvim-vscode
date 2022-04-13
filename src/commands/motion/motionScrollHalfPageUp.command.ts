import { Position } from "vscode";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { calculateScroll, scroll } from "../../utilities/selection.util";
import { CommandMotionJump } from "./motionJump.command";

export class CommandMotionScrollHalfPageUp extends SFVimCommand {
    constructor() {
        super("motion.scrollHalfPageUp", "Moves the cursor to the bottom of the document", SFVimMode.NORMAL | SFVimMode.VISUAL);
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
        const currentPosition = vimEditor.editor.selection.active;
        let jumpLine = currentPosition.line - Math.floor((view.end.line - view.start.line) / 2);
        jumpLine = jumpLine < 0 ? 0 : jumpLine;
    
        CommandMotionJump.instance().execute(vimEditor, jumpLine + 1);
        const maxScroll = calculateScroll(vimEditor, new Position(0, 0));
    
        if(!maxScroll) {
            return;
        }
    
        scroll(Math.max(jumpLine - view.end.line, maxScroll));
    }
}