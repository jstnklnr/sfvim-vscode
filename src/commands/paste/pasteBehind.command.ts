import { SFVimEditor } from "../types/SFVimEditor";
import { getRightPosition, paste } from "../utilities/selection.util";

export async function executePasteBehind(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const location = getRightPosition(vimEditor.editor.selection.active);
    paste(vimEditor, location);
}