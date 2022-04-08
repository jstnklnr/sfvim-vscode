import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange, getLeftPosition, getRelativePosition, RelativeDirection } from "../utilities/selection.util";
import { executeModeChangeInsert } from "./modeInsert.command";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executeReplaceInsert(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    deleteRange(vimEditor, vimEditor.editor.selection).then(() => {
        executeModeChangeVisual(vimEditor, 0);
        executeModeChangeInsert(vimEditor, amplifier);
    });
}