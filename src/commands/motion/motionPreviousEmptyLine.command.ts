import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { CommandMotionJump } from "./motionJump.command";

export class CommandMotionPreviousEmptyLine extends SFVimCommand {
    constructor() {
        super("motion.previousEmptyLine", "Moves the cursor to the previous empty line", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const currentPosition = vimEditor.editor.selection.active;
        let line = currentPosition.line - 1;
        let noJump = true;
    
        for(let i = 0; i < amplifier; i++) {
            while(line > 0) {
                const previousLine = vimEditor.editor.document.lineAt(line - 1).text.trim().length;
                const currentLine = vimEditor.editor.document.lineAt(line).text.trim().length;
                const nextLine = vimEditor.editor.document.lineAt(line + 1).text.trim().length;
                noJump = false;
    
                if(!currentLine && (previousLine || nextLine)) {
                    break;
                }
    
                line--;
            }
        }
    
        if(noJump) {
            CommandMotionJump.instance().execute(vimEditor, 1);
            return;
        }
    
        CommandMotionJump.instance().execute(vimEditor, line + 1);
    }
}