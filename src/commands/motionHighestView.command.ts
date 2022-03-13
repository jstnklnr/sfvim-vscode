import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionJump } from "./motionJump.command";

export function executeMotionHighestView(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const visibleRanges = vimEditor.editor.visibleRanges;

    if(visibleRanges === undefined || visibleRanges.length == 0) {
        return;
    }

    const view = visibleRanges[0];
    executeMotionJump(vimEditor, view.start.line + 1);
}