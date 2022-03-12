import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../utilities/selection.util";

export function executeMotionSkipLeft(vimEditor: SFVimEditor, amplifier: number) {
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

    const isPositionAdjusted = vimEditor.mode & SFVimMode.VISUAL && isAdjustedPostion(anchor, currentPosition);
    
    if(isPositionAdjusted) {
        character -= character > 0 ? 1 : 0;
    }

    for(let i = 0; i < amplifier; i++) {
        let lineBreak = false;

        if(character <= 0) {
            line--;
            lineText = vimEditor.editor.document.lineAt(line).text;
            character = lineText.length;
            lineBreak = true;
        }
        
        let j = character;
        let skipType = 0;

        if(j > 0 && j <= lineText.length) {
            if(/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j - 1])?.length) {
                skipType = 1;
            }else if(/^\s$/.exec(lineText[j - 1])?.length) {
                skipType = 2;
            }
        }

        if(lineBreak) {
            skipType = 2;
        }

        while(j > 0 
            && (j > lineText.length || skipType == 0 && /^[^a-zA-Z0-9\u00C0-\u02DB8_ ]$/.exec(lineText[j - 1])?.length
            || skipType == 1 && /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j - 1])?.length
            || skipType == 2 && (/^\s$/.exec(lineText[j])?.length || j == character))) {
            j--;
        }

        character = j;
    }
    
    let newPosition = vimEditor.editor.selection.active.with(line, character);
    
    if(!(vimEditor.mode & SFVimMode.VISUAL)) {
        anchor = newPosition;
    }

    if(isPositionAdjusted) {
        newPosition = getRightPosition(newPosition);
    }

    handleSelection(vimEditor, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}