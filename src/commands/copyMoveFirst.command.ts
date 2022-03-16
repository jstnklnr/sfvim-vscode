import { Selection } from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { copyRange, getRelativePosition, RelativeDirection, selectionToRange } from "../utilities/selection.util";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executeCopyMoveFirst(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
        return;
    }

    const selection = vimEditor.editor.selection;
    copyRange(vimEditor, selectionToRange(selection));

    const newPosition = getRelativePosition(selection.anchor, selection.active) == RelativeDirection.Right ? selection.anchor : selection.active;
    vimEditor.editor.selection = new Selection(newPosition, newPosition);

    executeModeChangeVisual(vimEditor, 0);
}