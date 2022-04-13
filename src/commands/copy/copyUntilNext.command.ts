import { SFVimEditor } from "../types/SFVimEditor";
import { copyRange, getRangeToNextWord } from "../utilities/selection.util";

export function executeCopyUntilNext(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const range = getRangeToNextWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
    
    if(!range) {
        return;
    }

    copyRange(vimEditor, range);
}