import { SFVimEditor } from "../types/SFVimEditor";

export function executeDeleteUntilNext(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const currentPosition = vimEditor.editor.selection.active;
    const text = vimEditor.editor.document.lineAt(currentPosition.line).text;

    let character = currentPosition.character;

    while(character > 0 && !/\s/.exec(text[character - 1])?.length) {
        character--;
    }

    while(character < text.length && /\s/.exec(text[character])?.length) {
        character++;
    }
    
    const start = currentPosition.with(currentPosition.line, character);
    
    for(let i = 0; i < amplifier; i++) {
        let skipType = 0;
    
        if(/\s/.exec(text[character])?.length) {
            return;
        }else if(/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(text[character])?.length) {
            skipType = 1;
        }
    }
}