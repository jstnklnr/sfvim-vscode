import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getLeftPosition, getRelativePosition, RelativeDirection, deleteRange } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandDelete extends SFVimCommand {
    constructor() {
        super("delete", "Deletes the currently selected text", SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const selection = vimEditor.editor.selection;
        const newPosition = getLeftPosition(getRelativePosition(selection.anchor, selection.active) == RelativeDirection.Right ? selection.anchor : selection.active);
    
        deleteRange(vimEditor, vimEditor.editor.selection).then(() => {
            CommandModeVisual.instance().execute(vimEditor, 0);
            handleSelection(vimEditor, newPosition);
        });
    }
}