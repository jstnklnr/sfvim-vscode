import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../../utilities/selection.util";

export class CommandMotionRealLineStart extends SFVimCommand {
    constructor() {
        super("motion.realLineStart", "Moves the cursor to the start of the line", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier !== 0) {
            return;
        }

        const visualMode = vimEditor.mode & SFVimMode.VISUAL; 
        const currentPosition = vimEditor.editor.selection.active;
    
        let anchor = vimEditor.tags.get("anchor") || currentPosition;
        const wasAdjusted = visualMode && isAdjustedPostion(anchor, currentPosition);

        let newPosition = vimEditor.editor.selection.active.with(currentPosition.line, 0);
        newPosition = visualMode && wasAdjusted ? getRightPosition(newPosition) : newPosition;
    
        vimEditor.tags.set("lastCharacter", newPosition.character);
        handleSelection(vimEditor, newPosition);
    }
}