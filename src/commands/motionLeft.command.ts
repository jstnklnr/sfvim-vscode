import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getLeftPosition, getOffsetPosition } from "../utilities/selection.util";

export function executeMotionLeft(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const currentPosition = vimEditor.editor.selection.active;
    
    const newPosition = getOffsetPosition(currentPosition, 0, -amplifier);
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }

    handleSelection(vimEditor, newPosition);
    vimEditor.editor.selection.isReversed = true;
    vimEditor.tags.set("lastCharacter", newPosition.character);
}