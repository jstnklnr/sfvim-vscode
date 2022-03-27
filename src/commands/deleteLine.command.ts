import { Range } from "vscode";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { deleteRange } from "../utilities/selection.util";

export function executeDeleteLine(vimEditor: SFVimEditor, amplifier: number) {
    if(vimEditor.mode & SFVimMode.VISUAL) {
        return;
    }

    if(amplifier <= 0) {
        amplifier = 1;
    }

    const currentLine = vimEditor.editor.selection.active.line;
    const maxLine = vimEditor.editor.document.lineCount - 1;
    
    const firstRange = vimEditor.editor.document.lineAt(currentLine).rangeIncludingLineBreak;
    const lastRange = vimEditor.editor.document.lineAt(Math.min(currentLine + amplifier - 1, maxLine)).rangeIncludingLineBreak;

    deleteRange(vimEditor, new Range(firstRange.start, lastRange.end));
}