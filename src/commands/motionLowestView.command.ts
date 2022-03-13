import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionJump } from "./motionJump.command";

export function executeMotionLowestView(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const visibleRanges = vimEditor.editor.visibleRanges;

    if(visibleRanges === undefined || visibleRanges.length == 0) {
        return;
    }

    const view = visibleRanges[0];
    executeMotionJump(vimEditor, view.end.line + 1);
}