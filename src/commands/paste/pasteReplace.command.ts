import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { pasteReplace, getRelativePosition, RelativeDirection } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandPasteReplace extends SFVimCommand {
    constructor() {
        super("paste.replace", "Replace the currently selected text with the contents of the clipboard", SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0 || !(vimEditor.mode & SFVimMode.VISUAL)) {
            return;
        }
    
        const location = vimEditor.editor.selection;
        CommandModeVisual.instance().execute(vimEditor, 0);
    
        pasteReplace(vimEditor, location).then(() => {
            const newPosition = getRelativePosition(location.anchor, location.active) === RelativeDirection.Left ? location.active : location.anchor;
            handleSelection(vimEditor, newPosition);
        });
    }
}