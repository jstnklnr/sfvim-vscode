import { Selection } from "vscode";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { copyRange, selectionToRange, getRelativePosition, RelativeDirection } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandCopyMoveFirst extends SFVimCommand {
    constructor() {
        super("copy.moveFirst", "Copies the highlighted text and jumps to first selected character", SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
            return;
        }
    
        const selection = vimEditor.editor.selection;
        copyRange(vimEditor, selectionToRange(selection));
    
        const newPosition = getRelativePosition(selection.anchor, selection.active) == RelativeDirection.Right ? selection.anchor : selection.active;
        vimEditor.editor.selection = new Selection(newPosition, newPosition);
    
        CommandModeVisual.instance().execute(vimEditor, 0);
    }
}