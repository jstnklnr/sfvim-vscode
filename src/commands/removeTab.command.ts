import { Range } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { getOffsetPosition, getStartOfLine } from "../utilities/selection.util";

export function executeRemoveTab(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const location = getStartOfLine(vimEditor, vimEditor.editor.selection.active.line);
    const tabSize = vimEditor.sfvim.editorConfig.get("tabSize") as number;
    const maxSpaces = tabSize * amplifier;
    const lineText = vimEditor.editor.document.lineAt(location.line).text;

    let spaceCount = 0;

    for(; spaceCount < maxSpaces; spaceCount++) {
        if(!/\s/.exec(lineText[spaceCount])) {
            break;
        }
    }

    if(spaceCount > 0) {
        const start = getStartOfLine(vimEditor, location.line);
        const range = new Range(start, getOffsetPosition(start, 0, spaceCount));

        vimEditor.editor.edit(editBuilder => {
            editBuilder.delete(range);
        });
    }
}