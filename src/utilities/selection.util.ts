import * as vscode from "vscode";

/**
 * A decoration used to draw a custom cursor
 */
export const cursorDecoration = vscode.window.createTextEditorDecorationType({
    color: new vscode.ThemeColor("editorCursor.background"),
    backgroundColor: new vscode.ThemeColor("editorCursor.foreground")
});

export enum RelativeDirection {
    Left,
    Right,
    Equal
}

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