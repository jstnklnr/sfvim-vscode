import { TextEditorCursorStyle, TextEditorLineNumbersStyle } from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";

export function executeModeChangeInsert(vimEditor: SFVimEditor) {
    vimEditor.mode = SFVimMode.INSERT;
    const isRelative = vimEditor.config["insertModeLineNumberRelative"];
    vimEditor.editor.options.lineNumbers = isRelative ? TextEditorLineNumbersStyle.Relative : TextEditorLineNumbersStyle.On;;
    vimEditor.callStatusCallback();

    vimEditor.editor.options.cursorStyle = TextEditorCursorStyle.Line;
}