import { Range } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange, getEndOfWord, getStartOfWord } from "../utilities/selection.util";

export function executeDeleteWord(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier != 0) {
        return;
    }

    const active = vimEditor.editor.selection.active;
    const start = getStartOfWord(vimEditor, active, includeSpecial);
    
    if(!start) {
        return;
    }

    const end = getEndOfWord(vimEditor, active, includeSpecial)!;
    deleteRange(vimEditor, new Range(start, end));
}