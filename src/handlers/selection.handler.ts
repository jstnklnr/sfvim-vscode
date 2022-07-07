import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import * as vscode from "vscode";
import { cursorDecoration, getLeftPosition, getOffsetPosition, getRelativePosition as getRelativeDirection, getRightPosition, moveCursorWithCommand, RelativeDirection, verticalScroll } from "../utilities/selection.util";

/**
 * When in visual mode there are certain conditions when the anchor needs to be shifted
 * This function will handle that
 * 
 * This function will also draw another cursor using decorations in order to make the selection more authentic
 * @param vimEditor The editor vscode is currently in
 * @param newPosition The position you want to set the cursor to
 * @param correctPosition if true and in visual mode on the right side of the anchor, the position will be corrected to the right
 */
export function handleSelection(vimEditor: SFVimEditor, newPosition: vscode.Position) {
    let visualMode: boolean = false;
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        visualMode = true;
        anchor = vimEditor.tags.get("anchor") || anchor;
    }

    const currentPosition = vimEditor.editor.selection.active;
    const motionDirection = getRelativeDirection(currentPosition, newPosition);

    let selectionDirection = getRelativeDirection(anchor, newPosition);
    let range = new vscode.Range(newPosition, getRightPosition(newPosition));
    const lineLength = vimEditor.editor.document.lineAt(newPosition.line).text.length;

    /**
     * Yes, this looks really cluttered
     * Sometime in the future this will probably look better...
     * But vscodes cursor is to blame
     */

    if(newPosition.character > lineLength) {
        newPosition = getOffsetPosition(newPosition, 0, lineLength - newPosition.character);
    }

    if(visualMode && motionDirection !== RelativeDirection.Right && newPosition.character === anchor.character + 1) {
        newPosition = getLeftPosition(newPosition);
        selectionDirection = getRelativeDirection(anchor, newPosition);
        range = new vscode.Range(newPosition, getRightPosition(newPosition));
    }

    const lastPosition = vimEditor.tags.get("lastEditorCharacter") || vimEditor.editor.selection.active;

    /**
     * Scrolling was fixed by calculating the position to relative motions
     * and changing it through the command interface
     * 
     * Maybe sometime in the future vscode will allow the api to handle horizontal scrolling
     */

    if(!visualMode || selectionDirection === RelativeDirection.Right) {
        if(visualMode) {
            if(motionDirection === RelativeDirection.Right && newPosition.line === anchor.line && newPosition.character === anchor.character + 1) {
                newPosition = getRightPosition(newPosition);
            }

            if(newPosition.character <= 0 && lineLength > 0) {
                newPosition = new vscode.Position(newPosition.line, 1);
            }

            vimEditor.editor.options.cursorStyle = lineLength === 0 ? vscode.TextEditorCursorStyle.Block : vscode.TextEditorCursorStyle.Line;
        }else if(newPosition.character > lineLength - 1) {
            newPosition = getOffsetPosition(newPosition, 0, (lineLength - 1) - newPosition.character);
            anchor = newPosition;
        }

        if(visualMode) {
            vimEditor.editor.selection = new vscode.Selection(anchor, lastPosition);
            moveCursorWithCommand(vimEditor, newPosition, true);
        }else {
            moveCursorWithCommand(vimEditor, newPosition);
        }

        range = new vscode.Range(getLeftPosition(newPosition), newPosition);
    }else {
        if(newPosition.character > lineLength - 1) {
            newPosition = getOffsetPosition(newPosition, 0, (lineLength - 1) - newPosition.character);
        }

        vimEditor.editor.selection = new vscode.Selection(getRightPosition(anchor), lastPosition);
        moveCursorWithCommand(vimEditor, newPosition, true);
        vimEditor.editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
    }
    
    if(visualMode) {
        vimEditor.editor.setDecorations(cursorDecoration, [range]);
    }

    /**
     * Scroll if cursor is out of range
     * Currently redundant due to the ugly way horizontal scrolling had to be fixed
     */

    //verticalScroll(calculateScroll(vimEditor, newPosition));
}