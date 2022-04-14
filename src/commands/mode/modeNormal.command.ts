import { TextEditorLineNumbersStyle, TextEditorCursorStyle, Selection } from "vscode";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getLeftPosition } from "../../utilities/selection.util";

export class CommandModeNormal extends SFVimCommand {
    constructor() {
        super("mode.normal", "Switches the current editor mode to NORMAL", SFVimMode.INSERT);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        vimEditor.changeMode(SFVimMode.NORMAL);
        const isRelative = vimEditor.sfvim.sfvimConfig["normalModeLineNumberRelative"];
        vimEditor.editor.options.lineNumbers = isRelative ? TextEditorLineNumbersStyle.Relative : TextEditorLineNumbersStyle.On;
        vimEditor.callStatusCallback();
    
        vimEditor.editor.options.cursorStyle = TextEditorCursorStyle.Block;
        const newPosition = getLeftPosition(vimEditor.editor.selection.active);
        vimEditor.editor.selection = new Selection(newPosition, newPosition);
        vimEditor.tags.set("lastCharacter", newPosition.character);
    }
}