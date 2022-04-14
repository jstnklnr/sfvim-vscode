import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { pasteReplace, getRelativePosition, RelativeDirection } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandPasteReplaceMoveBehind extends SFVimCommand {
    constructor() {
        super("paste.replaceMoveBehind", "Replace the currently selected text with the contents of the clipboard, and move behind the pasted text", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
            return;
        }
    
        const location = vimEditor.editor.selection;
        CommandModeVisual.instance().execute(vimEditor, 0);
    
        pasteReplace(vimEditor, location).then(text => {
            const position = getRelativePosition(location.anchor, location.active) === RelativeDirection.Left ? location.active : location.anchor;
    
            let character = position.character + text.length;
            let line = position.line;
    
            if(text.includes("\n")) {
                const lines = text.split("\n");
                line += lines.length - 1;
                character = Math.max(lines[lines.length - 1].length, 0);
            }
    
            handleSelection(vimEditor, position.with(line, character));
        });
    }
}