import { SFVimEditor } from "../types/SFVimEditor";
import { getStartOfLine } from "../utilities/selection.util";

export function executeAddTab(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const selection = vimEditor.editor.selection;
    let startLine = selection.active.line;
    let endLine = selection.anchor.line;

    if(startLine > endLine) {
        [startLine, endLine] = [endLine, startLine];
    }

    const tabSize = vimEditor.sfvim.editorConfig.get("tabSize") as number;
    
    vimEditor.editor.edit(editBuilder => {
        for(let i = startLine; i <= endLine; i++) {
            const location = getStartOfLine(vimEditor, i);
            editBuilder.insert(location, " ".repeat(amplifier * tabSize));
        }
    });
}