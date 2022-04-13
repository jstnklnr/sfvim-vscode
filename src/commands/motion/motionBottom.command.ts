import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { CommandMotionJump } from "./motionJump.command";

export class CommandMotionBottom extends SFVimCommand {
    constructor() {
        super("motion.bottom", "Moves the cursor to the bottom of the document", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandMotionJump.instance().execute(vimEditor, vimEditor.editor.document.lineCount);
    }
}