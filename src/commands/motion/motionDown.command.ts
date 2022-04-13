import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";

export class CommandMotionDown extends SFVimCommand {
    constructor() {
        super("motion.down", "Moves the cursor to the line below", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const lineCount = vimEditor.editor.document.lineCount - 1;
    
        const currentPosition = vimEditor.editor.selection.active;
        const offset = currentPosition.line + amplifier >= lineCount ? lineCount - currentPosition.line : amplifier;
        const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;
    
        const newPosition = vimEditor.editor.selection.active.with(currentPosition.line + offset, character);
        let anchor = newPosition;
    
        if(vimEditor.mode & SFVimMode.VISUAL) {
            anchor = vimEditor.tags.get("anchor") || newPosition;
        }
    
        handleSelection(vimEditor, newPosition);
    }
}