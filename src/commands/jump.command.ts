import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../utilities/selection.util";

export function executeMotionJump(vimEditor: SFVimEditor, line: number) {
    if(line == 0) {
        return;
    }

    const lineCount = vimEditor.editor.document.lineCount;
    line = line > lineCount ? lineCount : line;
    
    const lineText = vimEditor.editor.document.lineAt(line - 1).text;
    let character = 0;
    
    while(character < lineText.length - 1 && /^\s$/.exec(lineText[character])?.length) {
        character++;
    }

    let newPosition = vimEditor.editor.selection.active.with(line - 1, character);
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
        newPosition = isAdjustedPostion(anchor, newPosition) ? getRightPosition(newPosition) : newPosition;
    }

    handleSelection(vimEditor, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}