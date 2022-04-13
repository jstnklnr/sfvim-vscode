import { SFVimEditor } from "../types/SFVimEditor";
import { copyRange, deleteRange, getRangeOfWord} from "../utilities/selection.util";

export function executeCutWord(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier != 0) {
        return;
    }

    const range = getRangeOfWord(vimEditor, vimEditor.editor.selection.active, includeSpecial);

    if(!range) {
        return;
    }

    copyRange(vimEditor, range);
    deleteRange(vimEditor, range);
}