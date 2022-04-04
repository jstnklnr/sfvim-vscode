import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../utilities/selection.util";
import { executeMotionSkipRight } from "./motionSkipRight.command";

export function executeMotionSkipRightSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeMotionSkipRight(vimEditor, amplifier, true);
}