import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../../utilities/selection.util";

export class CommandMotionLineEnd extends SFVimCommand {
    constructor() {
        super("motion.lineEnd", "Moves the cursor to the last character of the line", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier !== 0) {
            return;
        }
    
        const visualMode = vimEditor.mode & SFVimMode.VISUAL;

        const currentPosition = vimEditor.editor.selection.active;
        const lineText = vimEditor.editor.document.lineAt(currentPosition.line).text;
        let character = lineText.length - 1;
        
        let anchor = vimEditor.tags.get("anchor") || currentPosition;
        const wasAdjusted = visualMode && isAdjustedPostion(anchor, currentPosition);

        while(character > 0 && /^\s$/.exec(lineText[character])?.length) {
            character--;
        }
    
        let newPosition = vimEditor.editor.selection.active.with(currentPosition.line, character);
        newPosition = visualMode && wasAdjusted ? getRightPosition(newPosition) : newPosition;
    
        vimEditor.tags.set("lastCharacter", newPosition.character);
        handleSelection(vimEditor, newPosition);
    }
}