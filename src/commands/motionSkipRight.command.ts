import * as vscode from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";

export function executeMotionSkipRight(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const currentPosition = vimEditor.editor.selection.active;
    let line = currentPosition.line;
    let character = currentPosition.character;
    let lineText = vimEditor.editor.document.lineAt(line).text;
    
    for(let i = 0; i < amplifier; i++) {
        let lineBreak = false;

        if(character >= lineText.length) {
            line++;
            character = 0;
            lineText = vimEditor.editor.document.lineAt(line).text;
            lineBreak = true;
        }
        
        let j = character;
        let skipType = 0;

        if(j < lineText.length - 1) {
            if(/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j + 1])?.length) {
                skipType = 1;
            }else if(/^\s$/.exec(lineText[j + 1])?.length) {
                skipType = 2;
            }
        }

        if(lineBreak) {
            skipType = 2;
        }

        while(j < lineText.length - 1
            && (skipType == 0 && /^[^a-zA-Z0-9\u00C0-\u02DB8_ ]$/.exec(lineText[j + 1])?.length
            || skipType == 1 && /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j + 1])?.length
            || skipType == 2 && (/^\s$/.exec(lineText[j])?.length || j == character))) {
            j++;
        }

        character = j;
    }
    
    const newPosition = vimEditor.editor.selection.active.with(line, character);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}