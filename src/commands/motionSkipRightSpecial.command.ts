import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionSkipRight } from "./motionSkipRight.command";

export function executeMotionSkipRightSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeMotionSkipRight(vimEditor, amplifier, true);
}