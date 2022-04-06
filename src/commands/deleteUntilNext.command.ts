import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange, getRangeToNextWord } from "../utilities/selection.util";

export function executeDeleteUntilNext(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const range = getRangeToNextWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
    
    if(!range) {
        return;
    }

    deleteRange(vimEditor, range);
}