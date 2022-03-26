import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange } from "../utilities/selection.util";

export function executeDelete(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    deleteRange(vimEditor, vimEditor.editor.selection);
}