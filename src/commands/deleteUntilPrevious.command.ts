import { Range } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange, getEndOfWord, getLeftPosition, getRelativePosition, getStartOfLine, getStartOfNextWord, getStartOfPreviousWord, getStartOfWord, RelativeDirection } from "../utilities/selection.util";

export function executeDeleteUntilPrevious(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const active = vimEditor.editor.selection.active;
    let end = getStartOfWord(vimEditor, active, includeSpecial) || getStartOfPreviousWord(vimEditor, active, includeSpecial);

    if(!end) {
        return;
    }

    //TODO: fix wrong behaviour

    end = getEndOfWord(vimEditor, end, includeSpecial)!;
    let current = getLeftPosition(end.with(end.line, end.character));

    for(let i = 0; i < amplifier; i++) {
        const startOfLine = getStartOfLine(vimEditor, current.line);
        current = getLeftPosition(getEndOfWord(vimEditor, getStartOfPreviousWord(vimEditor, current, includeSpecial) || startOfLine, includeSpecial) || startOfLine);
    }

    if(getRelativePosition(end, current) & (RelativeDirection.Equal | RelativeDirection.Right)) {
        return;
    }
    
    deleteRange(vimEditor, new Range(current, end));
}