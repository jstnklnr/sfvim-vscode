import { Position } from "vscode";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { calculateScroll, verticalScroll } from "../../utilities/selection.util";
import { CommandMotionJump } from "./motionJump.command";

export class CommandMotionScrollHalfPageDown extends SFVimCommand {
    constructor() {
        super("motion.scrollHalfPageDown", "Moves the cursor half a page up and will set the scroll view to the cursor", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier !== 0) {
            return;
        }
    
        const visibleRanges = vimEditor.editor.visibleRanges;
    
        if(visibleRanges === undefined || visibleRanges.length === 0) {
            return;
        }
    
        const view = visibleRanges[0];
        const currentPosition = vimEditor.editor.selection.active;
        const jumpLine = currentPosition.line + Math.floor((view.end.line - view.start.line) / 2);
        
        CommandMotionJump.instance().execute(vimEditor, jumpLine + 1);
        const maxScroll = calculateScroll(vimEditor, new Position(vimEditor.editor.document.lineCount - 1, 0));
    
        if(!maxScroll) {
            return;
        }
    
        verticalScroll(Math.min(jumpLine - view.start.line, maxScroll));
    }
}