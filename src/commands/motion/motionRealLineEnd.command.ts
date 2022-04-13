import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../../utilities/selection.util";

export class CommandMotionRealLineEnd extends SFVimCommand {
    constructor() {
        super("motion.realLineEnd", "Moves the cursor to the end of the line", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const currentPosition = vimEditor.editor.selection.active;
        const lineText = vimEditor.editor.document.lineAt(currentPosition.line).text;
        let character = lineText.length == 0 ? 0 : lineText.length - 1;
    
        let newPosition = vimEditor.editor.selection.active.with(currentPosition.line, character);
        let anchor = newPosition;
    
        if(vimEditor.mode & SFVimMode.VISUAL) {
            anchor = vimEditor.tags.get("anchor") || newPosition;
            newPosition = isAdjustedPostion(anchor, newPosition) ? getRightPosition(newPosition) : newPosition;
        }
    
        handleSelection(vimEditor, newPosition);
        vimEditor.tags.set("lastCharacter", newPosition.character);
    }
}