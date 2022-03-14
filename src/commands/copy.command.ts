import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { copyRange, selectionToRange } from "../utilities/selection.util";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executeCopy(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
        return;
    }

    copyRange(vimEditor, selectionToRange(vimEditor.editor.selection));
    executeModeChangeVisual(vimEditor, 0);
}