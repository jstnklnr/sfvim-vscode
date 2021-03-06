import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRightPosition, paste } from "../../utilities/selection.util";

export class CommandPasteBehindMoveBehind extends SFVimCommand {
    constructor() {
        super("paste.behindMoveBehind", "Paste the content of the clipboard behind the cursor, and move behind the pasted text", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const location = getRightPosition(vimEditor.editor.selection.active);
        paste(vimEditor, location).then(text => {
            let character = location.character + text.length;
            let line = location.line;
    
            if(text.includes("\n")) {
                const lines = text.split("\n");
                line += lines.length - 1;
                character = Math.max(lines[lines.length - 1].length, 0);
            }
    
            handleSelection(vimEditor, location.with(line, character));
        });
    }
}