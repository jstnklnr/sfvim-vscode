import { Selection } from "vscode";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { copyRange, selectionToRange, getLeftPosition, getRelativePosition, RelativeDirection } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandCopyMoveLast extends SFVimCommand {
    constructor() {
        super("copy.moveLast", "Copies the highlighted text and jumps to the last selected character", SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
            return;
        }
    
        const selection = vimEditor.editor.selection;
        copyRange(vimEditor, selectionToRange(selection));
    
        const newPosition = getLeftPosition(getRelativePosition(selection.anchor, selection.active) == RelativeDirection.Right ? selection.active : selection.anchor);
        vimEditor.editor.selection = new Selection(newPosition, newPosition);
    
        CommandModeVisual.instance().execute(vimEditor, 0);
    }
}