import { SFVimEditor } from "../types/SFVimEditor";
import { executeModeChangeInsertAppend } from "./modeInsertAppend.command";
import { executeMotionRealLineEnd } from "./motionRealLineEnd.command";

export function executeModeChangeInsertAppendLineEnd(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    executeMotionRealLineEnd(vimEditor, 0);
    executeModeChangeInsertAppend(vimEditor, amplifier);
}