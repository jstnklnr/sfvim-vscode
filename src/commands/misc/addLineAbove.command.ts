import { SFVimEditor } from "../../types/SFVimEditor";
import { getStartOfLine } from "../../utilities/selection.util";

export function executeAddLineAbove(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const line = vimEditor.editor.selection.active.line;

    vimEditor.editor.edit(editBuilder => {
        editBuilder.insert(getStartOfLine(vimEditor, line), "\n".repeat(amplifier));
    });
}