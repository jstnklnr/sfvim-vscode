import { Range } from "vscode";
import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor } from "../types/SFVimEditor";
import { getRightPosition } from "../utilities/selection.util";

export function executeDeleteCharacter(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const active = vimEditor.editor.selection.active;

    vimEditor.editor.edit(editBuilder => {
        editBuilder.delete(new Range(active, getRightPosition(active)));
    }).then(() => {
        handleSelection(vimEditor, active);
    });
}