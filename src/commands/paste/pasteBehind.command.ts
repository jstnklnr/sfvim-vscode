import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRightPosition, paste } from "../../utilities/selection.util";

export class CommandPasteBeforeMoveBehind extends SFVimCommand {
    constructor() {
        super("paste.behind", "Paste the content of the clipboard behind the cursor", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const location = getRightPosition(vimEditor.editor.selection.active);
        paste(vimEditor, location);
    }
}