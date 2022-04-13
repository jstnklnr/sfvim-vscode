import { handleSelection } from "../../handlers/selection.handler";
import { SFVimEditor } from "../../types/SFVimEditor";
import { getLeftPosition, getRightPosition, isAdjustedPostion } from "../../utilities/selection.util";

export function executeSelectionSwap(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    let anchor = vimEditor.tags.get("anchor");

    if(!anchor) {
        return;
    }

    let active = vimEditor.editor.selection.active;

    if(isAdjustedPostion(anchor, active)) {
        active = getLeftPosition(active);
    }else {
        anchor = getRightPosition(anchor);
    }

    vimEditor.tags.set("anchor", active);
    handleSelection(vimEditor, anchor);
}