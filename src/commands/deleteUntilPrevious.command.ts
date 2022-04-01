import { Position, Range } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange, getEndOfWord, getLeftPosition, getRelativePosition, getStartOfLine, getStartOfPreviousWord, getStartOfWord, RelativeDirection } from "../utilities/selection.util";

export function executeDeleteUntilPrevious(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const active = vimEditor.editor.selection.active;
    let end = getStartOfWord(vimEditor, active, includeSpecial) || getStartOfPreviousWord(vimEditor, active, includeSpecial);

    if(!end) {
        return;
    }

    end = getEndOfWord(vimEditor, end, includeSpecial)!;
    let current: Position | undefined = getLeftPosition(end.with(end.line, end.character));
    let lastLine = current.line;

    for(let i = 0; i < amplifier; i++) {
        if(!current) {
            break;
        }

        lastLine = current.line;
        current = getStartOfPreviousWord(vimEditor, current, includeSpecial);
    }

    //TODO: fix wrong behaviour with tabs

    current = current ? getEndOfWord(vimEditor, current, includeSpecial)! : getStartOfLine(vimEditor, lastLine);

    if(getRelativePosition(end, current) & (RelativeDirection.Equal | RelativeDirection.Right)) {
        return;
    }
    
    deleteRange(vimEditor, new Range(current, end));
}