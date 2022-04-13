import { SFVimEditor } from "../types/SFVimEditor";
import { getEndOfLine } from "../utilities/selection.util";

export function executeAddLineBelow(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const line = vimEditor.editor.selection.active.line;

    vimEditor.editor.edit(editBuilder => {
        editBuilder.insert(getEndOfLine(vimEditor, line), "\n".repeat(amplifier));
    });
}