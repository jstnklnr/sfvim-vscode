import { SFVimEditor } from "../types/SFVimEditor";
import { copyRange, getRangeToPreviousWord } from "../utilities/selection.util";

export function executeCopyUntilPrevious(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const range = getRangeToPreviousWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);

    if(!range) {
        return;
    }

    copyRange(vimEditor, range);
}