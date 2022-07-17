import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import * as vscode from "vscode";
import { cursorDecoration, getLeftPosition, getOffsetPosition, getRelativePosition as getRelativeDirection, getRightPosition, moveCursorWithCommand, RelativeDirection } from "../utilities/selection.util";

/**
 * When in visual mode there are certain conditions when the anchor needs to be shifted
 * This function will handle that
 * 
 * This function will also draw another cursor using decorations in order to make the selection more authentic
 * @param vimEditor The editor vscode is currently in
 * @param newPosition The position you want to set the cursor to
 * @param correctPosition if true and in visual mode on the right side of the anchor, the position will be corrected to the right
 * @returns a promise that will be resolved when the motion is completed
 */
export function handleSelection(vimEditor: SFVimEditor, newPosition: vscode.Position) {
    let visualMode = false;
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        visualMode = true;
        anchor = vimEditor.tags.get("anchor") || anchor;
    }

    const currentPosition = vimEditor.editor.selection.active;
    const motionDirection = getRelativeDirection(currentPosition, newPosition);
    const lastSelectionDirection = getRelativeDirection(vimEditor.editor.selection.anchor, currentPosition);

    let selectionDirection = getRelativeDirection(anchor, newPosition);
    const lineLength = vimEditor.editor.document.lineAt(newPosition.line).text.length;

    /**
     * Yes, this looks really cluttered
     * Sometime in the future this will probably look better...
     * But vscodes cursor is to blame
     */

    if(newPosition.character > lineLength) {
        newPosition = getOffsetPosition(newPosition, 0, lineLength - newPosition.character);
    }

    if(visualMode && motionDirection !== RelativeDirection.Right && newPosition.line === anchor.line && newPosition.character === anchor.character + 1) {
        newPosition = getLeftPosition(newPosition);
        selectionDirection = getRelativeDirection(anchor, newPosition);
        vimEditor.tags.set("lastCharacter", newPosition.character);
    }

    const lastAnchor = vimEditor.editor.selection.anchor;
    const lastPosition = vimEditor.tags.get("lastEditorCharacter") || currentPosition;
    
    let promise: Promise<unknown>;
    let noSelectionSet = false;
    let shiftFakeCursorLeft = false;

    if(getRelativeDirection(lastAnchor, anchor) === RelativeDirection.Equal) {
        noSelectionSet = true;
    }

    /**
     * Scrolling was fixed by calculating the position to relative motions
     * and changing it through the command interface
     * 
     * Maybe sometime in the future vscode will allow the api to handle horizontal scrolling
     */

    if(!visualMode || selectionDirection === RelativeDirection.Right) {
        if(visualMode) {
            if(motionDirection === RelativeDirection.Right && newPosition.line === anchor.line && newPosition.character === anchor.character + 1 || lastSelectionDirection === RelativeDirection.Left) {
                newPosition = getRightPosition(newPosition);
                vimEditor.tags.set("lastCharacter", newPosition.character);
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
            if(!noSelectionSet) {
                vimEditor.editor.selection = new vscode.Selection(anchor, lastPosition);
            }

            promise = moveCursorWithCommand(vimEditor, newPosition, true);
        }else {
            promise = moveCursorWithCommand(vimEditor, newPosition);
        }

        shiftFakeCursorLeft = true;
    }else {
        if(newPosition.character > lineLength - 1) {
            newPosition = getOffsetPosition(newPosition, 0, (lineLength - 1) - newPosition.character);
            vimEditor.tags.set("lastCharacter", newPosition.character);
        }
        
        if(selectionDirection !== RelativeDirection.Equal && lastSelectionDirection === RelativeDirection.Right) {
            newPosition = getLeftPosition(newPosition);
            vimEditor.tags.set("lastCharacter", newPosition.character);
        }

        const newAnchor = getRightPosition(anchor);

        if(getRelativeDirection(lastAnchor, newAnchor) !== RelativeDirection.Equal) {
            noSelectionSet = false;
        }

        if(!noSelectionSet) {
            vimEditor.editor.selection = new vscode.Selection(newAnchor, lastPosition);
        }

        promise = moveCursorWithCommand(vimEditor, newPosition, true);
        vimEditor.editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
    }
    
    if(visualMode) {
        promise.then(() => {
            const active = vimEditor.editor.selection.active;
            let range = new vscode.Range(active, getRightPosition(active));

            if(shiftFakeCursorLeft) {
                range = new vscode.Range(getLeftPosition(active), active);
            }

            vimEditor.editor.setDecorations(cursorDecoration, [range]);
        });
    }

    /**
     * Scroll if cursor is out of range
     * Currently redundant due to the ugly way horizontal scrolling had to be fixed
     */

    //verticalScroll(calculateScroll(vimEditor, newPosition));
    return promise;
}