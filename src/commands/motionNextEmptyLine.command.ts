import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionBottom } from "./motionBottom.command";
import { executeMotionJump } from "./motionJump.command";

export function executeMotionNextEmptyLine(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const lineCount = vimEditor.editor.document.lineCount - 1;
    const currentPosition = vimEditor.editor.selection.active;
    let line = currentPosition.line + 1;
    let noJump = true;

    for(let i = 0; i < amplifier; i++) {
        while(line < lineCount) {
            const previousLine = vimEditor.editor.document.lineAt(line - 1).text.trim().length;
            const currentLine = vimEditor.editor.document.lineAt(line).text.trim().length;
            const nextLine = vimEditor.editor.document.lineAt(line + 1).text.trim().length;
            noJump = false;

            if(!currentLine && (previousLine || nextLine)) {
                break;
            }

            line++;
        }
    }

    if(noJump) {
        executeMotionBottom(vimEditor, 0);
        return;
    }

    executeMotionJump(vimEditor, line + 1);
}