import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionJump } from "./jump.command";

export function executeMotionTop(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    executeMotionJump(vimEditor, 1);
}