import { TextEditorCursorStyle } from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";

export function executeModeChangeNormal(vimEditor: SFVimEditor) {
    vimEditor.mode = SFVimMode.NORMAL;
    const isRelative = vimEditor.config["normalModeLineNumberRelative"];
    vimEditor.editor.options.lineNumbers = isRelative;
    vimEditor.callStatusCallback();

    vimEditor.editor.options.cursorStyle = TextEditorCursorStyle.Block;
}