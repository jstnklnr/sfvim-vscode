import { Position } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { calculateScroll, scroll } from "../utilities/selection.util";
import { executeMotionJump } from "./motionJump.command";

export function executeMotionScrollHalfPageUp(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const visibleRanges = vimEditor.editor.visibleRanges;

    if(visibleRanges === undefined || visibleRanges.length == 0) {
        return;
    }

    const view = visibleRanges[0];
    const currentPosition = vimEditor.editor.selection.active;
    let jumpLine = currentPosition.line - Math.floor((view.end.line - view.start.line) / 2);
    jumpLine = jumpLine < 0 ? 0 : jumpLine;

    executeMotionJump(vimEditor, jumpLine + 1);
    const maxScroll = calculateScroll(vimEditor, new Position(0, 0));

    if(!maxScroll) {
        return;
    }

    scroll(Math.max(jumpLine - view.end.line, maxScroll));
}