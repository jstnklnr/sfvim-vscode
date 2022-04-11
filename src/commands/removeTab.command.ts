import { Range } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { getOffsetPosition, getStartOfLine } from "../utilities/selection.util";

export function executeRemoveTab(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const selection = vimEditor.editor.selection;
    const tabSize = vimEditor.sfvim.editorConfig.get("tabSize") as number;
    const maxSpaces = tabSize * amplifier;

    let startLine = selection.active.line;
    let endLine = selection.anchor.line;

    if(startLine > endLine) {
        [startLine, endLine] = [endLine, startLine];
    }

    vimEditor.editor.edit(editBuilder => {
        for(let i = startLine; i <= endLine; i++) {
            const lineText = vimEditor.editor.document.lineAt(i).text;
            let spaceCount = 0;

            for(; spaceCount < maxSpaces; spaceCount++) {
                if(!/\s/.exec(lineText[spaceCount])) {
                    break;
                }
            }
            
            if(spaceCount <= 0) {
                continue;
            }

            const start = getStartOfLine(vimEditor, i);
            const range = new Range(start, getOffsetPosition(start, 0, spaceCount));
            editBuilder.delete(range);
        }
    });
}