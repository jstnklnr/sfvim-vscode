import { Range } from "vscode";
import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor } from "../types/SFVimEditor";
import { getEndOfLine, getLeftPosition, getRightPosition } from "../utilities/selection.util";

export function executeDeleteRightCharacter(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const active = getRightPosition(vimEditor.editor.selection.active);
    const lineEnd = getEndOfLine(vimEditor, active.line);
    const deleteEnd = active.character >= lineEnd.character
                    ? vimEditor.editor.document.lineAt(lineEnd.line).rangeIncludingLineBreak.end
                    : getRightPosition(active);

    vimEditor.editor.edit(editBuilder => {
        editBuilder.delete(new Range(active, deleteEnd));
    }).then(() => {
        handleSelection(vimEditor, getLeftPosition(active));
    });
}