import * as vscode from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";

export enum RelativeDirection {
    Left,
    Right,
    Equal
}

/**
 * A decoration used to draw a custom cursor
 */
export const cursorDecoration = vscode.window.createTextEditorDecorationType({
    color: new vscode.ThemeColor("editorCursor.background"),
    backgroundColor: new vscode.ThemeColor("editorCursor.foreground")
});


/**
 * Returns The relative direction of the offset between the given and the anchor position
 * @param anchor The position from where it should measure
 * @param position The position to which it should measure
 * @returns The relative direction of the offset between the given and the anchor position
 */
export function getRelativePosition(anchor: vscode.Position, position: vscode.Position): RelativeDirection {
    const sameLine = position.line == anchor.line;
    
    if(position.line < anchor.line || sameLine && position.character < anchor.character) {
        return RelativeDirection.Left;
    }else if(position.line > anchor.line || sameLine && position.character > anchor.character) {
        return RelativeDirection.Right;
    }

    return RelativeDirection.Equal;
}

/**
 * Returns the position to the left of the given position
 * @param position the origin position
 * @returns the position to the left
 */
export function getLeftPosition(position: vscode.Position): vscode.Position {
    return getOffsetPosition(position, 0, -1);
}

/**
 * Returns the position to the right of the given position
 * @param position the origin position
 * @returns the position to the right
 */
export function getRightPosition(position: vscode.Position): vscode.Position {
    return getOffsetPosition(position, 0, 1);
}

/**
 * Returns a position relative to the given position offset by the speciefied amount
 * @param position the origin position
 * @param line the line offset
 * @param character the character offset
 * @returns a position relative to the given position offset by the speciefied amount
 */
export function getOffsetPosition(position: vscode.Position, line: number, character: number): vscode.Position {
    return position.with(Math.max(position.line + line, 0), Math.max(position.character + character, 0));
}

/**
 * Checks whether or not this position needs to be adjusted in visual mode
 * @param anchor the position of the anchor
 * @param position the position you want to check
 * @returns true if the position needs to be adjusted and false if it doesn't
 */
export function isAdjustedPostion(anchor: vscode.Position, position: vscode.Position): boolean {
    return getRelativePosition(anchor, position) === RelativeDirection.Right;
}

/**
 * Scrolls the view by the given number of lines
 * @param offset the number of lines you want to scroll (negative values scroll up and positive values scroll down)
 * @param revealCursor if true reveals the cursor while scrolling, otherwise does not
 */
export function scroll(offset: number, revealCursor: boolean = false) {
    if(offset == 0) {
        return;
    }

    vscode.commands.executeCommand('editorScroll', {to: offset < 0 ? "up" : "down", by: "line", value: Math.abs(offset), revealCursor: revealCursor});
}

/**
 * Returns the number of lines to scroll in order to make the given position visible
 * @param vimEditor the editor that is currently used
 * @param position the position you want to check
 * @returns the number of lines the view needs to scroll (negative values scroll up and positive values scroll down)
 */
export function calculateScroll(vimEditor: SFVimEditor, position: vscode.Position): number {
    const visibleRanges = vimEditor.editor.visibleRanges;
    
    if(visibleRanges === undefined || visibleRanges.length == 0) {
        return 0;
    }
    
    const view = visibleRanges[0];
    const scrollOffset = vimEditor.sfvim.editorConfig.get("cursorSurroundingLines") as number || 0;
    const currentLine = position.line;
    const lineCount = vimEditor.editor.document.lineCount;

    if(view.start.line > 0 && currentLine < view.start.line + scrollOffset) {
        return currentLine - (view.start.line + scrollOffset);
    }else if(view.end.line < lineCount - 1 && currentLine > view.end.line - scrollOffset) {
        return currentLine - (view.end.line - scrollOffset);
    }

    return 0;
}

/**
 * Converts a selection into a range
 * @param selection the selection you want to convert
 * @returns the converted selection
 */
export function selectionToRange(selection: vscode.Selection): vscode.Range {
    return new vscode.Range(selection.start, selection.end);
}

/**
 * Copies a given range of text
 * @param vimEditor the editor that contains the text
 * @param range the range in which to find the text
 */
export function copyRange(vimEditor: SFVimEditor, range: vscode.Range) {
    const text = vimEditor.editor.document.getText(range);
    vscode.env.clipboard.writeText(text);
}