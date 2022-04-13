import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getRelativePosition, pasteReplace, RelativeDirection } from "../utilities/selection.util";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executePasteReplace(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
        return;
    }

    const location = vimEditor.editor.selection;
    executeModeChangeVisual(vimEditor, 0);

    pasteReplace(vimEditor, location).then(() => {
        const newPosition = getRelativePosition(location.anchor, location.active) === RelativeDirection.Left ? location.active : location.anchor;
        handleSelection(vimEditor, newPosition);
    });
}