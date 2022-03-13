import { TextEditorCursorStyle, TextEditorLineNumbersStyle } from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { cursorDecoration } from "../utilities/selection.util";

export function executeModeChangeInsert(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    vimEditor.mode = SFVimMode.INSERT;
    const isRelative = vimEditor.sfvim.sfvimConfig["insertModeLineNumberRelative"];
    vimEditor.editor.options.lineNumbers = isRelative ? TextEditorLineNumbersStyle.Relative : TextEditorLineNumbersStyle.On;;
    vimEditor.callStatusCallback();

    vimEditor.editor.options.cursorStyle = TextEditorCursorStyle.Line;
    vimEditor.editor.setDecorations(cursorDecoration, []);
}