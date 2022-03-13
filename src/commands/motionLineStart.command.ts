import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../utilities/selection.util";

export function executeMotionLineStart(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const currentPosition = vimEditor.editor.selection.active;
    const lineText = vimEditor.editor.document.lineAt(currentPosition.line).text;
    let character = 0;
    
    while(character < lineText.length - 1 && /^\s$/.exec(lineText[character])?.length) {
        character++;
    }

    let newPosition = vimEditor.editor.selection.active.with(currentPosition.line, character);
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
        newPosition = isAdjustedPostion(anchor, newPosition) ? getRightPosition(newPosition) : newPosition;
    }

    handleSelection(vimEditor, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}