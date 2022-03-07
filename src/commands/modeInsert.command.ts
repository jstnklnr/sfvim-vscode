import { TextEditorCursorStyle } from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";

export function executeModeChangeInsert(vimEditor: SFVimEditor) {
    vimEditor.mode = SFVimMode.INSERT;
    const isRelative = vimEditor.config["insertModeLineNumberRelative"];
    vimEditor.editor.options.lineNumbers = isRelative;
    vimEditor.callStatusCallback();

    vimEditor.editor.options.cursorStyle = TextEditorCursorStyle.Line;
}