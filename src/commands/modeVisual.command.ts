import * as vscode from "vscode";
import { TextEditorCursorStyle } from "vscode";
import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { cursorDecoration, getLeftPosition, isAdjustedPostion } from "../utilities/selection.util";

export function executeModeChangeVisual(vimEditor: SFVimEditor) {
    if(!(vimEditor.mode & SFVimMode.NORMAL)) {
        vimEditor.mode &= ~SFVimMode.VISUAL;
        return;
    }
    
    vimEditor.mode ^= SFVimMode.VISUAL;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        vimEditor.tags.set("anchor", vimEditor.editor.selection.active.with());
        handleSelection(vimEditor, vimEditor.editor.selection.active);
    }else {
        vimEditor.tags.delete("anchor");
        vimEditor.editor.setDecorations(cursorDecoration, []);

        const anchor = vimEditor.editor.selection.anchor;
        let active = vimEditor.editor.selection.active;

        /**
         * Original correction needs to be reverted to avoid a jumping cursor
         */

        if(isAdjustedPostion(anchor, active)) {
            active = getLeftPosition(active);
        }

        vimEditor.editor.selection = new vscode.Selection(active, active);
    }

    const isRelative = vimEditor.config["normalModeLineNumberRelative"];
    vimEditor.editor.options.lineNumbers = isRelative ? vscode.TextEditorLineNumbersStyle.Relative : vscode.TextEditorLineNumbersStyle.On;
    vimEditor.callStatusCallback();

    vimEditor.editor.options.cursorStyle = TextEditorCursorStyle.Block;
}