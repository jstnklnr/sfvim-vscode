import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";

export function executeMotionTop(vimEditor: SFVimEditor) {
    const currentPosition = vimEditor.editor.selection.active;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;

    const newPosition = vimEditor.editor.selection.active.with(0, character);
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }

    handleSelection(vimEditor, newPosition);
}