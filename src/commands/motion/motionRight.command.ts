import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { getOffsetPosition } from "../../utilities/selection.util";

export class CommandMotionRight extends SFVimCommand {
    constructor() {
        super("motion.right", "Moves the cursor to the character to the right", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier === 0) {
            amplifier = 1;
        }
    
        const currentPosition = vimEditor.editor.selection.active;
        const newPosition = getOffsetPosition(currentPosition, 0, amplifier);
    
        vimEditor.tags.set("lastCharacter", newPosition.character);
        handleSelection(vimEditor, newPosition);
    }
}