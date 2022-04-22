import { Range } from "vscode";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { copyRange, deleteRange } from "../../utilities/selection.util";

export class CommandCutLine extends SFVimCommand {
    constructor() {
        super("cut.line", "Cuts the current line", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(vimEditor.mode & SFVimMode.VISUAL) {
            return;
        }
    
        if(amplifier <= 0) {
            amplifier = 1;
        }
    
        const currentLine = vimEditor.editor.selection.active.line;
        const maxLine = vimEditor.editor.document.lineCount - 1;
        
        const firstRange = vimEditor.editor.document.lineAt(currentLine).rangeIncludingLineBreak;
        const lastLine = vimEditor.editor.document.lineAt(Math.min(currentLine + amplifier - 1, maxLine));
    
        copyRange(vimEditor, new Range(firstRange.start, lastLine.range.end));
        deleteRange(vimEditor, new Range(firstRange.start, lastLine.rangeIncludingLineBreak.end));
    }
}