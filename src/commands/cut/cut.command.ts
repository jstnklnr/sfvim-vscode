import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { selectionToRange, copyRange, getLeftPosition, getRelativePosition, RelativeDirection, deleteRange } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandCut extends SFVimCommand {
    constructor() {
        super("cut", "Cuts the highligted text", SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
            return;
        }
    
        const selection = vimEditor.editor.selection;
        const range = selectionToRange(selection);
    
        copyRange(vimEditor, range);
        const newPosition = getLeftPosition(getRelativePosition(selection.anchor, selection.active) == RelativeDirection.Right ? selection.anchor : selection.active);
    
        deleteRange(vimEditor, range).then(() => {
            CommandModeVisual.instance().execute(vimEditor, 0);
            handleSelection(vimEditor, newPosition);
        });
    }
}