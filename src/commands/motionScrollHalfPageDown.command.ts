import { Position } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { calculateScroll, scroll } from "../utilities/selection.util";
import { executeMotionJump } from "./motionJump.command";

export function executeMotionScrollHalfPageDown(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    const visibleRanges = vimEditor.editor.visibleRanges;

    if(visibleRanges === undefined || visibleRanges.length == 0) {
        return;
    }

    const view = visibleRanges[0];
    const currentPosition = vimEditor.editor.selection.active;
    const jumpLine = currentPosition.line + Math.floor((view.end.line - view.start.line) / 2);
    
    executeMotionJump(vimEditor, jumpLine + 1);
    const maxScroll = calculateScroll(vimEditor, new Position(vimEditor.editor.document.lineCount - 1, 0));

    if(!maxScroll) {
        return;
    }

    scroll(Math.min(jumpLine - view.start.line, maxScroll));
}