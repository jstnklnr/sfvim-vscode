import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getEndOfLine, getLeftPosition, getRightPosition, getStartOfNextWord, isAdjustedPostion } from "../utilities/selection.util";

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

    for(let i = 0; i < amplifier; i++) {
        active = getStartOfNextWord(vimEditor, active, includeSpecial) || getEndOfLine(vimEditor, active.line);
    }

    active = visualMode && isAdjustedPostion(anchor, active) ? getRightPosition(active) : active;
    handleSelection(vimEditor, active);
    vimEditor.tags.set("lastCharacter", active.character);
}