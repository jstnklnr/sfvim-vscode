import { Range } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange } from "../utilities/selection.util";

export function executeDeleteUntilPreviousSpecial(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const currentPosition = vimEditor.editor.selection.active;
    const text = vimEditor.editor.document.lineAt(currentPosition.line).text;

    let character = currentPosition.character;

    while(character < text.length && !/\s/.exec(text[character])?.length) {
        character++;
    }

    while(character > 0 && /\s/.exec(text[character - 1])?.length) {
        character--;
    }
    
    const start = currentPosition.with(currentPosition.line, character);
    
    for(let i = 0; i < amplifier; i++) {
        let skipType = 1;
    
        if(/\s/.exec(text[character - 1])?.length) {
            return;
        }

        while(character > 0) {
            const isSpace = /^\s$/.exec(text[character - 1])?.length;

            if(skipType == 0 && !isSpace) {
                break;
            }else if(skipType == 1 && isSpace) {
                skipType = 0;
            }

            character--;
        }
    }

    if(start.character <= character) {
        return;
    }

    const end = start.with(start.line, character);
    deleteRange(vimEditor, new Range(end, start));
}