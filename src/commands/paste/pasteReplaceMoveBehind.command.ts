import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getRelativePosition, pasteReplace, RelativeDirection } from "../utilities/selection.util";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executePasteReplaceMoveBehind(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
        return;
    }

    const location = vimEditor.editor.selection;
    executeModeChangeVisual(vimEditor, 0);

    pasteReplace(vimEditor, location).then(text => {
        const position = getRelativePosition(location.anchor, location.active) === RelativeDirection.Left ? location.active : location.anchor;

        let character = position.character + text.length;
        let line = position.line;

        if(text.includes("\n")) {
            const lines = text.split("\n");
            line += lines.length - 1;
            character = Math.max(lines[lines.length - 1].length, 0);
        }

        handleSelection(vimEditor, position.with(line, character));
    });
}