import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getEndOfLine, getEndOfWord, getLeftPosition, getRelativePosition, getRightPosition, getStartOfNextWord, getStartOfWord, isAdjustedPostion, RelativeDirection } from "../utilities/selection.util";

export function executeMotionSkipEndRight(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const visualMode = vimEditor.mode & SFVimMode.VISUAL;
    const anchor = vimEditor.editor.selection.anchor;
    let active = vimEditor.editor.selection.active;

    if(visualMode && isAdjustedPostion(anchor, active)) {
        active = getLeftPosition(active);
    }

    const endOfCurrent = getEndOfWord(vimEditor, active, includeSpecial);

    if(endOfCurrent && getRelativePosition(getLeftPosition(endOfCurrent), active) == RelativeDirection.Left) {
        active = getStartOfWord(vimEditor, active, includeSpecial)!;
        amplifier--;
    }

    for(let i = 0; i < amplifier; i++) {
        active = getStartOfNextWord(vimEditor, active, includeSpecial) || getEndOfLine(vimEditor, active.line);
    }

    active = getLeftPosition(getEndOfWord(vimEditor, active, includeSpecial) || active);
    active = visualMode && isAdjustedPostion(anchor, active) ? getRightPosition(active) : active;
    handleSelection(vimEditor, active);
    vimEditor.tags.set("lastCharacter", active.character);
}