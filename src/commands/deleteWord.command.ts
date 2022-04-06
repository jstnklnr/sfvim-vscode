import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange, getRangeOfWord} from "../utilities/selection.util";

export function executeDeleteWord(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier != 0) {
        return;
    }

    const range = getRangeOfWord(vimEditor, vimEditor.editor.selection.active, includeSpecial);

    if(!range) {
        return;
    }

    deleteRange(vimEditor, range);
}