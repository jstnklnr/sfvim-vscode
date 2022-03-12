import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";

export function executeMotionDown(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const lineCount = vimEditor.editor.document.lineCount - 1;

    const currentPosition = vimEditor.editor.selection.active;
    const offset = currentPosition.line + amplifier >= lineCount ? lineCount - currentPosition.line : amplifier;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;

    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line + offset, character);
    let anchor = newPosition;

    if(vimEditor.mode & SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }

    handleSelection(vimEditor, newPosition);
}