import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionSkipEndLeft } from "./motionSkipEndLeft.command";

export function executeMotionSkipEndLeftSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeMotionSkipEndLeft(vimEditor, amplifier, true);
}