import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { cursorDecoration, isAdjustedPostion, getLeftPosition } from "../../utilities/selection.util";
import * as vscode from "vscode";

export class CommandModeVisual extends SFVimCommand {
    private static _instance: CommandModeVisual;

    constructor() {
        super("mode.visual", "Toggles between visual and normal mode", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandModeVisual {
        return CommandModeVisual._instance || new CommandModeVisual();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        if(!(vimEditor.mode & (SFVimMode.NORMAL | SFVimMode.VISUAL))) {
            vimEditor.changeMode(vimEditor.mode & ~SFVimMode.VISUAL);
            return;
        }
        
        vimEditor.changeMode(vimEditor.mode & SFVimMode.VISUAL ? SFVimMode.NORMAL : SFVimMode.VISUAL);
    
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
    
        const isRelative = vimEditor.sfvim.sfvimConfig["normalModeLineNumberRelative"];
        vimEditor.editor.options.lineNumbers = isRelative ? vscode.TextEditorLineNumbersStyle.Relative : vscode.TextEditorLineNumbersStyle.On;
        vimEditor.callStatusCallback();
    
        vimEditor.editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
    }
}