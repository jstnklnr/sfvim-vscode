import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionSkipLeft } from "./motionSkipLeft.command";

export function executeMotionSkipLeftSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeMotionSkipLeft(vimEditor, amplifier, true);
}