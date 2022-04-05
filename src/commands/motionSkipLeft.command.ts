import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getLeftPosition, getRelativePosition, getRightPosition, getStartOfLine, getStartOfPreviousWord, getStartOfWord, isAdjustedPostion, RelativeDirection } from "../utilities/selection.util";

export function executeMotionSkipLeft(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const visualMode = vimEditor.mode & SFVimMode.VISUAL;
    const anchor = vimEditor.editor.selection.anchor;
    let active = vimEditor.editor.selection.active;

    if(visualMode && isAdjustedPostion(anchor, active)) {
        active = getLeftPosition(active);
    }

    const startOfCurrent = getStartOfWord(vimEditor, active, includeSpecial);

    if(startOfCurrent && getRelativePosition(startOfCurrent, active) == RelativeDirection.Right) {
        active = getStartOfWord(vimEditor, active, includeSpecial)!;
        amplifier--;
    }

    for(let i = 0; i < amplifier; i++) {
        active = getStartOfPreviousWord(vimEditor, active, includeSpecial) || getStartOfLine(vimEditor, active.line);
    }

    active = visualMode && isAdjustedPostion(anchor, active) ? getRightPosition(active) : active;
    handleSelection(vimEditor, active);
    vimEditor.tags.set("lastCharacter", active.character);
}