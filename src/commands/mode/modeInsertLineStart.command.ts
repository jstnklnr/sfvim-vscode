import { SFVimEditor } from "../types/SFVimEditor";
import { executeModeChangeInsert } from "./modeInsert.command";
import { executeMotionLineStart } from "./motionLineStart.command";

export function executeModeChangeInsertLineStart(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    executeMotionLineStart(vimEditor, 0);
    executeModeChangeInsert(vimEditor, amplifier);
}