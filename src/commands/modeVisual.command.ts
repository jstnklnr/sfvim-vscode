import { TextEditorCursorStyle } from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";

export function executeModeChangeVisual(vimEditor: SFVimEditor) {
    if(!(vimEditor.mode & SFVimMode.NORMAL)) {
        vimEditor.mode &= ~SFVimMode.VISUAL;
        return;
    }
    
    vimEditor.mode ^= SFVimMode.VISUAL;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        vimEditor.tags.set("anchor", vimEditor.editor.selection.active.with());
    }else {
        vimEditor.tags.delete("anchor");
    }

    const isRelative = vimEditor.config["normalModeLineNumberRelative"];
    vimEditor.editor.options.lineNumbers = isRelative;
    vimEditor.callStatusCallback();

    vimEditor.editor.options.cursorStyle = TextEditorCursorStyle.Block;
}