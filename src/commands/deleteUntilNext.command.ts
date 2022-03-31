import { Range } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange, getEndOfLine, getRelativePosition, getStartOfNextWord, getStartOfWord, RelativeDirection } from "../utilities/selection.util";

export function executeDeleteUntilNext(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const active = vimEditor.editor.selection.active;
    const start = getStartOfWord(vimEditor, active, includeSpecial) || getStartOfNextWord(vimEditor, active, includeSpecial);

    if(!start) {
        return;
    }

    let current = start.with(start.line, start.character);

    for(let i = 0; i < amplifier; i++) {
        current = getStartOfNextWord(vimEditor, current, includeSpecial) || getEndOfLine(vimEditor, current.line);
    }

    if(getRelativePosition(start, current) == RelativeDirection.Equal) {
        return;
    }
    
    deleteRange(vimEditor, new Range(start, current));
}