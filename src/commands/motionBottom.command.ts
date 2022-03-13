import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionJump } from "./jump.command";

export function executeMotionBottom(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    executeMotionJump(vimEditor, vimEditor.editor.document.lineCount);
}