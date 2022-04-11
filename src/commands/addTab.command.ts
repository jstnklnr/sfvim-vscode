import { SFVimEditor } from "../types/SFVimEditor";
import { getStartOfLine } from "../utilities/selection.util";

export function executeAddTab(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const location = getStartOfLine(vimEditor, vimEditor.editor.selection.active.line);
    const tabSize = vimEditor.sfvim.editorConfig.get("tabSize") as number;

    vimEditor.editor.edit(editBuilder => {
        editBuilder.insert(location, " ".repeat(amplifier * tabSize));
    });
}