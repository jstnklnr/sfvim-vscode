import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { paste } from "../../utilities/selection.util";

export class CommandPasteBefore extends SFVimCommand {
    constructor() {
        super("paste.before", "Paste the content of the clipboard in front of the cursor", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const location = vimEditor.editor.selection.active;
        paste(vimEditor, location).then(() => {
            handleSelection(vimEditor, location);
        });
    }
}