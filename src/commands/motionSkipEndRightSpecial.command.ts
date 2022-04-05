import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../utilities/selection.util";
import { executeMotionSkipEndRight } from "./motionSkipEndRight.command";

export function executeMotionSkipEndRightSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeMotionSkipEndRight(vimEditor, amplifier, true);
}