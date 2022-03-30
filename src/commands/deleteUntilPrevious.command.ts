import { Range } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange } from "../utilities/selection.util";

export function executeDeleteUntilPrevious(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const currentPosition = vimEditor.editor.selection.active;
    const text = vimEditor.editor.document.lineAt(currentPosition.line).text;

    let character = currentPosition.character;
    let startType = 2;

    if(/\s/.exec(text[character])?.length) {
        startType = 0;
    }else if(/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character])?.length) {
        startType = 1;
    }

    while(character < text.length) {
        const isLetter = /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character])?.length;
        const isSpace = /\s/.exec(text[character])?.length;

        if(startType == 0 && !isSpace) {
            startType = isLetter ? 1 : 2;
        }else if(startType == 1 && !isLetter || startType == 2 && (isLetter || isSpace)) {
            break;
        }

        character++;
    }

    while(character > 0 && /\s/.exec(text[character - 1])?.length) {
        character--;
    }
    
    const start = currentPosition.with(currentPosition.line, character);
    
    for(let i = 0; i < amplifier; i++) {
        let skipType = 2;
    
        if(/\s/.exec(text[character - 1])?.length) {
            return;
        }else if(/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character - 1])?.length) {
            skipType = 1;
        }

        while(character > 0) {
            const isLetter = /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character - 1])?.length;
            const isSpace = /^\s$/.exec(text[character - 1])?.length;

            if(skipType == 0 && !isSpace) {
                break;
            }else if(skipType == 1 && !isLetter) {
                if(!isSpace) {
                    break;
                }

                skipType = 0;
            }else if(skipType == 2) {
                if(isLetter) {
                    break;
                }else if(isSpace) {
                    skipType = 0;
                }
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