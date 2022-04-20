import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { copyRange, selectionToRange } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandCopy extends SFVimCommand {
    constructor() {
        super("copy", "Copies the highlighted text", SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
            return;
        }
    
        copyRange(vimEditor, selectionToRange(vimEditor.editor.selection));
        CommandModeVisual.instance().execute(vimEditor, 0);
    }
}