import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { copyRange, getLeftPosition, getRelativePosition, RelativeDirection, selectionToRange } from "../utilities/selection.util";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executeCut(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
        return;
    }

    const selection = vimEditor.editor.selection;
    const range = selectionToRange(selection);

    copyRange(vimEditor, range);
    const newPosition = getLeftPosition(getRelativePosition(selection.anchor, selection.active) == RelativeDirection.Right ? selection.anchor : selection.active);
    
    vimEditor.editor.edit(editBuilder => {
        editBuilder.delete(range);
    }).then(() => {
        executeModeChangeVisual(vimEditor, 0);
        handleSelection(vimEditor, newPosition);
    });
}