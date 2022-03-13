import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../utilities/selection.util";

export function executeMotionSkipEndRightSpecial(vimEditor: SFVimEditor, amplifier: number) {
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
            if(!/^\s$/.exec(lineText[j + 1])?.length) {
                skipType = 1;
            }
        }

        while(j < lineText.length - 1) {
            const isLetter = /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j + 1])?.length;
            const isSpace = /^\s$/.exec(lineText[j + 1])?.length;

            if(skipType == 0 && !isSpace) {
                skipType = 1;
            }else if(skipType == 1 && isSpace) {
                break;
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