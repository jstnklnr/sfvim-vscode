import { handleSelection } from "../../handlers/selection.handler";
import { SFVimEditor } from "../../types/SFVimEditor";
import { deleteRange, getLeftPosition, getRelativePosition, RelativeDirection } from "../../utilities/selection.util";
import { executeModeChangeVisual } from "../modeVisual.command";

export function executeDelete(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const selection = vimEditor.editor.selection;
    const newPosition = getLeftPosition(getRelativePosition(selection.anchor, selection.active) == RelativeDirection.Right ? selection.anchor : selection.active);

    deleteRange(vimEditor, vimEditor.editor.selection).then(() => {
        executeModeChangeVisual(vimEditor, 0);
        handleSelection(vimEditor, newPosition);
    });
}