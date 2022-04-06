import { SFVimEditor } from "../types/SFVimEditor";
import { copyRange, deleteRange, getRangeToNextWord } from "../utilities/selection.util";

export function executeCutUntilNext(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const range = getRangeToNextWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
    
    if(!range) {
        return;
    }

    copyRange(vimEditor, range);
    deleteRange(vimEditor, range);
}