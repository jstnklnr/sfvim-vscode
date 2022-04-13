import { Selection } from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { copyRange, getLeftPosition, getRelativePosition, RelativeDirection, selectionToRange } from "../utilities/selection.util";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executeCopyMoveLast(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
        return;
    }

    const selection = vimEditor.editor.selection;
    copyRange(vimEditor, selectionToRange(selection));

    const newPosition = getLeftPosition(getRelativePosition(selection.anchor, selection.active) == RelativeDirection.Right ? selection.active : selection.anchor);
    vimEditor.editor.selection = new Selection(newPosition, newPosition);

    executeModeChangeVisual(vimEditor, 0);
}