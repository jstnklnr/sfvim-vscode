import * as vscode from "vscode";
import { SFVimConfigHandler } from "../handlers/config.handler";
import { SFVim } from "../sfvim";
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
 * Resolves the start of the line
 * @param vimEditor the editor that contains the document
 * @param line the line
 * @returns the start of the line as a Position
 */
export function getStartOfLine(vimEditor: SFVimEditor, line: number): vscode.Position {
    return vimEditor.editor.document.lineAt(line).range.start;
}

/**
 * Resolves the end of the line
 * @param vimEditor the editor that contains the document
 * @param line the line
 * @returns the end of the line as a Position
 */
export function getEndOfLine(vimEditor: SFVimEditor, line: number): vscode.Position {
    return vimEditor.editor.document.lineAt(line).range.end;
}

/**
 * Resolves the start of the word that is at the given position
 * @param vimEditor the editor that contains the document
 * @param position the position at which to find the word
 * @param includeSpecial true: words seperated by special characters will count as one, false: special characters will count as seperate words
 * @returns the start of the word or undefined if there is no word found at the position
 */
export function getStartOfWord(vimEditor: SFVimEditor, position: vscode.Position, includeSpecial: boolean): vscode.Position | undefined {
    const text = vimEditor.editor.document.lineAt(position.line).text;
    let character = position.character;

    let startType = 1;

    if(!text.length || /\s/.exec(text[character])?.length) {
        return undefined;
    }else if(!includeSpecial && !/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character])?.length) {
        startType = 2;
    }

    while(character > 0) {
        const isLetter = /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character - 1])?.length;
        const isSpace = /\s/.exec(text[character - 1])?.length;

        if(startType & (1 | 2) && isSpace || startType == 1 && !includeSpecial && !isLetter || startType == 2 && !includeSpecial && isLetter) {
            break;
        }

        character--;
    }

    return position.with(position.line, character);
}

/**
 * Resolves the end of the word that is at the given position
 * @param vimEditor the editor that contains the document
 * @param position the position at which to find the word
 * @param includeSpecial true: words seperated by special characters will count as one, false: special characters will count as seperate words
 * @returns the end of the word or undefined if there is no word found at the position
 */
export function getEndOfWord(vimEditor: SFVimEditor, position: vscode.Position, includeSpecial: boolean): vscode.Position | undefined {
    const text = vimEditor.editor.document.lineAt(position.line).text;
    let character = position.character;

    let startType = 1;

    if(/\s/.exec(text[character])?.length) {
        return undefined;
    }else if(!includeSpecial && !/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character])?.length) {
        startType = 2;
    }

    while(character < text.length) {
        const isLetter = /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character])?.length;
        const isSpace = /\s/.exec(text[character])?.length;

        if(startType & (1 | 2) && isSpace || startType == 1 && !includeSpecial && !isLetter || startType == 2 && !includeSpecial && isLetter) {
            break;
        }

        character++;
    }

    return position.with(position.line, character);
}

/**
 * Resolves the start of the previous word (also in the line before if necessary)
 * @param vimEditor the editor that contains the document
 * @param position the position at which to find the word
 * @param includeSpecial true: words seperated by special characters will count as one, false: special characters will count as seperate words
 * @returns the start of the previous word, the line, or undefined if there is no line above
 */
export function getStartOfPreviousWord(vimEditor: SFVimEditor, position: vscode.Position, includeSpecial: boolean): vscode.Position | undefined {
    const wordStart = getStartOfWord(vimEditor, position, includeSpecial);
    position = wordStart ? getLeftPosition(wordStart) : position;

    if(position.character == 0) {
        if(position.line == 0) {
            return undefined;
        }

        position = position.with(position.line - 1, Math.max(0, vimEditor.editor.document.lineAt(position.line - 1).text.length - 1));
    }

    const text = vimEditor.editor.document.lineAt(position.line).text;
    let character = position.character;

    let startType = 1;

    if(/\s/.exec(text[character])?.length) {
        startType = 0;
    }else if(!includeSpecial && !/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character])?.length) {
        startType = 2;
    }

    while(character > 0) {
        const isLetter = /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character - 1])?.length;
        const isSpace = /\s/.exec(text[character - 1])?.length;

        if(startType == 0 && !isSpace) {
            startType = isLetter || includeSpecial ? 1 : 2;
        }else if(startType & (1 | 2) && isSpace || startType == 1 && !includeSpecial && !isLetter || startType == 2 && !includeSpecial && isLetter) {
            break;
        }

        character--;
    }

    return position.with(position.line, character);
}

/**
 * Resolves the start of the next word (also on the next line if necessary)
 * @param vimEditor the edtior that contains the document
 * @param position the position at which to find the word
 * @param includeSpecial true: words seperated by special characters will count as one, false: special characters will count as seperate words
 * @returns the start of the next word or undefined if there is no next line
 */
export function getStartOfNextWord(vimEditor: SFVimEditor, position: vscode.Position, includeSpecial: boolean): vscode.Position | undefined {
    const wordEnd = getEndOfWord(vimEditor, position, includeSpecial);
    position = wordEnd || getRightPosition(position);

    let text = vimEditor.editor.document.lineAt(position.line).text;

    if(position.character >= text.length) {
        if(position.line + 1 >= vimEditor.editor.document.lineCount) {
            return undefined;
        }

        position = position.with(position.line + 1, 0);
    }

    text = vimEditor.editor.document.lineAt(position.line).text;
    let character = position.character;

    while(character < text.length && /\s/.exec(text[character])?.length) {
        character++;
    }

    return position.with(position.line, character);
}

/**
 * Resolves the range from the start of the current word to the start of the next word
 * @param vimEditor the editor that contains the document
 * @param position the position of the word
 * @param words the amount of words that should be skipped
 * @param includeSpecial true: words seperated by special characters will count as one, false: special characters will count as seperate words
 * @returns the range from the start of the current word to the start of the next word
 */
export function getRangeToNextWord(vimEditor: SFVimEditor, position: vscode.Position, words: number, includeSpecial: boolean): vscode.Range | undefined {
    const start = getStartOfWord(vimEditor, position, includeSpecial) || getStartOfNextWord(vimEditor, position, includeSpecial);

    if(!start) {
        return undefined;
    }

    let current = start.with(start.line, start.character);

    for(let i = 0; i < words; i++) {
        current = getStartOfNextWord(vimEditor, current, includeSpecial) || getEndOfLine(vimEditor, current.line);
    }

    if(getRelativePosition(start, current) == RelativeDirection.Equal) {
        return undefined;
    }

    return new vscode.Range(start, current);
}

/**
 * Resolves the range from the end of the current word to the end of the previous word
 * @param vimEditor the editor that contains the document
 * @param position the position of the word
 * @param words the amount of words that should be skipped
 * @param includeSpecial true: words seperated by special characters will count as one, false: special characters will count as seperate words
 * @returns the range from the end of the current word to the end of the previopus word
 */
export function getRangeToPreviousWord(vimEditor: SFVimEditor, position: vscode.Position, words: number, includeSpecial: boolean): vscode.Range | undefined {
    let end = getStartOfWord(vimEditor, position, includeSpecial) || getStartOfPreviousWord(vimEditor, position, includeSpecial);

    if(!end) {
        return undefined;
    }

    end = getEndOfWord(vimEditor, end, includeSpecial)!;
    let current: vscode.Position | undefined = getLeftPosition(end.with(end.line, end.character));
    let lastLine = current.line;

    for(let i = 0; i < words; i++) {
        if(!current) {
            break;
        }

        lastLine = current.line;
        current = getStartOfPreviousWord(vimEditor, current, includeSpecial);
    }

    current = current ? (getEndOfWord(vimEditor, current, includeSpecial) || current) : getStartOfLine(vimEditor, lastLine);

    if(getRelativePosition(end, current) & (RelativeDirection.Equal | RelativeDirection.Right)) {
        return undefined;
    }

    return new vscode.Range(current, end);
}

/**
 * Resolves the range from the start to the end of the current word
 * @param vimEditor the editor that contains the document
 * @param position the position of the word
 * @param includeSpecial true: words seperated by special characters will count as one, false: special characters will count as seperate words
 * @returns the range from the start of the end of the current word
 */
export function getRangeOfWord(vimEditor: SFVimEditor, position: vscode.Position, includeSpecial: boolean): vscode.Range | undefined {
    const start = getStartOfWord(vimEditor, position, includeSpecial);
    
    if(!start) {
        return;
    }

    const end = getEndOfWord(vimEditor, position, includeSpecial)!;
    return new vscode.Range(start, end);
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
    const scrollOffset = SFVimConfigHandler.instance().getConfig("editor")!.get("cursorSurroundingLines") as number || 0;
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

/**
 * Will insert the current text of the clipboard at the given location
 * @param vimEditor the editor that contains the document
 * @param location the position where to paste the clipboard content
 * @returns the text that was inserted
 */
export async function paste(vimEditor: SFVimEditor, location: vscode.Position): Promise<string> {
    const text = await vscode.env.clipboard.readText();
    await insert(vimEditor, location, text);
    return text;
}

/**
 * Will replace the specified range with the current contents of the clipboard
 * @param vimEditor the editor that contains the document
 * @param location the range or selection that should be replaced
 * @returns the text the range was replaced with
 */
export async function pasteReplace(vimEditor: SFVimEditor, location: vscode.Position | vscode.Range | vscode.Selection): Promise<string> {
    const text = await vscode.env.clipboard.readText();
    await replace(vimEditor, location, text);
    return text;
}

/**
 * Will insert the given text at the specified location
 * @param vimEditor the editor that contains the document
 * @param location the position where to insert the given text
 * @param text the text that should be inserted
 */
export async function insert(vimEditor: SFVimEditor, location: vscode.Position, text: string) {
    await vimEditor.editor.edit(editBuilder => {
        editBuilder.insert(location, text);
    });
}

/**
 * Will replace the specified range with the given text
 * @param vimEditor the editor that contains the document
 * @param location the range or selection that should be replaced
 * @param text the text to replace the given range with
 */
export async function replace(vimEditor: SFVimEditor, location: vscode.Position | vscode.Range | vscode.Selection, text: string) {
    await vimEditor.editor.edit(editBuilder => {
        editBuilder.replace(location, text);
    });
}

/**
 * Will delete the specified range
 * @param vimEditor the editor that contains the document
 * @param range the range or selection that should be deleted
 */
export async function deleteRange(vimEditor: SFVimEditor, range: vscode.Range | vscode.Selection) {
    await vimEditor.editor.edit(editBuilder => {
        editBuilder.delete(range);
    })
}