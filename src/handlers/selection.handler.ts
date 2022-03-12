import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import * as vscode from "vscode";
import { SFVim } from "../sfvim";
import { getRelativePosition as getRelativeDirection, RelativeDirection } from "../utilities/selection.util";

/**
 * When in visual mode there are certain conditions when the anchor needs to be shifted
 * This function will handle that
 * @param vimEditor The editor vscode is currently in
 * @param activePosition The position you want to set the cursor to
 */
export function handleSelection(vimEditor: SFVimEditor, activePosition: vscode.Position) {
    let visualMode: boolean = false;
    let anchor = activePosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        visualMode = true;
        anchor = vimEditor.tags.get("anchor") || anchor;
    }

    const direction = getRelativeDirection(anchor, activePosition);
    
    if(!visualMode || direction === RelativeDirection.Right) {
        vimEditor.editor.selection = new vscode.Selection(anchor, activePosition);
        return;
    }

    vimEditor.editor.selection = new vscode.Selection(anchor.with(anchor.line, anchor.character + 1), activePosition);
}

/**
 * This function will override the copy command to fix the selection issue vscode is creating
 * @param sfvim The sfvim object which holds all SFVimEditors
 * @param context The extension context to register events
 */
export function handleCopy(sfvim: SFVim, context: vscode.ExtensionContext) {
    const callOriginalCopy = async (disposable: vscode.Disposable) => {
        /**
         * The current handler needs to be disposed in order to be able to call the original command
         */

        disposable.dispose();
        await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
        context.subscriptions.push(disposable);
    };

    /**
     * When copying and in visual mode the character the cursor is on is not contained within the selection
     * This function will force to contain the last character within the copied text
     * Note that if not in visual mode the original copy command will be executed
     * @param disposable the copy handler
     */
    const copyHandler = async (disposable: vscode.Disposable) => {
        const vimEditor = sfvim.getEditor(vscode.window.activeTextEditor);
        
        if(!vimEditor || !(vimEditor.mode & SFVimMode.VISUAL)) {
            callOriginalCopy(disposable);
            return;
        }
        
        const selection = vimEditor.editor.selection;
        const direction = getRelativeDirection(selection.anchor, selection.active);

        if(direction !== RelativeDirection.Right) {
            callOriginalCopy(disposable);
            return;
        }

        const active = selection.active.with(selection.active.line, selection.active.character + 1);
        const text = vscode.window.activeTextEditor?.document.getText(new vscode.Range(selection.anchor, active));

        if(text === undefined) {
            callOriginalCopy(disposable);
            return;
        }

        await vscode.env.clipboard.writeText(text);
    };

    const handlerDisposable = vscode.commands.registerCommand("editor.action.clipboardCopyAction", async () => copyHandler(handlerDisposable));
    context.subscriptions.push(handlerDisposable);
}