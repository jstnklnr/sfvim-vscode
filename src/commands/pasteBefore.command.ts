import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor } from "../types/SFVimEditor";
import { paste } from "../utilities/selection.util";

export function executePasteBefore(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const location = vimEditor.editor.selection.active;
    paste(vimEditor, location).then(() => {
        handleSelection(vimEditor, location);
    });
}