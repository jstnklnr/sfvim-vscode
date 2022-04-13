import { Selection, TextEditorCursorStyle, TextEditorLineNumbersStyle } from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getLeftPosition } from "../utilities/selection.util";

export function executeModeChangeNormal(vimEditor: SFVimEditor, amplifier: number) {
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