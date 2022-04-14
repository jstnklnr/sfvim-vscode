import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { paste } from "../../utilities/selection.util";

export class CommandPasteBeforeMoveBehind extends SFVimCommand {
    constructor() {
        super("paste.beforeMoveBehind", "Paste the content of the clipboard in front of the cursor, and move behind the pasted text", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const location = vimEditor.editor.selection.active;
        paste(vimEditor, location);
    }
}