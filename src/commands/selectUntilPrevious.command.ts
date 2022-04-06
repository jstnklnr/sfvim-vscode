import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor } from "../types/SFVimEditor";
import { getLeftPosition, getRangeToPreviousWord } from "../utilities/selection.util";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executeSelectUntilPrevious(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const range = getRangeToPreviousWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);

    if(!range) {
        return;
    }

    executeModeChangeVisual(vimEditor, 0);
    vimEditor.tags.set("anchor", getLeftPosition(range.end));
    handleSelection(vimEditor, range.start);
}