import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionJump } from "./motionJump.command";
import { executeMotionTop } from "./motionTop.command";

export function executeMotionPreviousEmptyLine(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const currentPosition = vimEditor.editor.selection.active;
    let line = currentPosition.line - 1;
    let noJump = true;

    for(let i = 0; i < amplifier; i++) {
        while(line > 0) {
            const previousLine = vimEditor.editor.document.lineAt(line - 1).text.trim().length;
            const currentLine = vimEditor.editor.document.lineAt(line).text.trim().length;
            const nextLine = vimEditor.editor.document.lineAt(line + 1).text.trim().length;
            noJump = false;

            if(!currentLine && (previousLine || nextLine)) {
                break;
            }

            line--;
        }
    }

    if(noJump) {
        executeMotionTop(vimEditor, 0);
        return;
    }

    executeMotionJump(vimEditor, line + 1);
}