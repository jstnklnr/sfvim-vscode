import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../utilities/selection.util";

export function executeMotionSkipRight(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const currentPosition = vimEditor.editor.selection.active;
    let line = currentPosition.line;
    let character = currentPosition.character;
    let lineText = vimEditor.editor.document.lineAt(line).text;
    
    let anchor = currentPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || currentPosition;
    }

    let isPositionAdjusted = vimEditor.mode & SFVimMode.VISUAL && isAdjustedPostion(anchor, currentPosition);
    
    if(isPositionAdjusted) {
        character -= character > 0 ? 1 : 0;
    }

    for(let i = 0; i < amplifier; i++) {
        let lineBreak = false;

        if(character >= lineText.length - 1) {
            line++;
            character = 0;
            lineText = vimEditor.editor.document.lineAt(line).text;
            lineBreak = true;
        }
        
        let j = character;
        let skipType = 0;

        if(i < lineText.length - 1) {
            if(/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j])?.length) {
                skipType = 1;
            }else if(!/^\s$/.exec(lineText[j])?.length) {
                skipType = 2;
            }
        }

        while(j < lineText.length - 1) {
            const isLetter = /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j])?.length;
            const isSpace = /^\s$/.exec(lineText[j])?.length;

            if(skipType == 0 && !isSpace) {
                break;
            }
            else if(skipType == 1 && !isLetter) {
                if(!isSpace) {
                    break;
                }

                skipType = 0;
            }else if(skipType == 2 && (isSpace || isLetter)) {
                if(isLetter) {
                    break;
                }

                skipType = 0;
            }

            j++;
        }

        character = j;
    }
    
    let newPosition = vimEditor.editor.selection.active.with(line, character);
    
    if(!(vimEditor.mode & SFVimMode.VISUAL)) {
        anchor = newPosition;
    }
    
    isPositionAdjusted = vimEditor.mode & SFVimMode.VISUAL && isAdjustedPostion(anchor, newPosition);

    if(isPositionAdjusted) {
        newPosition = getRightPosition(newPosition);
    }
    
    handleSelection(vimEditor, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}