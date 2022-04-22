import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { deleteRange } from "../../utilities/selection.util";
import { CommandModeInsert } from "../mode/modeInsert.command";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandReplaceInsert extends SFVimCommand {
    constructor() {
        super("replace.insert", "Deletes all selected characters and switches to insert mode", SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        deleteRange(vimEditor, vimEditor.editor.selection).then(() => {
            CommandModeVisual.instance().execute(vimEditor, 0);
            CommandModeInsert.instance().execute(vimEditor, amplifier);
        });
    }
}