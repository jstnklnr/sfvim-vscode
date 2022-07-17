import { Range } from "vscode";
import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { deleteRange } from "../../utilities/selection.util";

export class CommandDeleteLine extends SFVimCommand {
    constructor() {
        super("delete.line", "Deletes the current line", SFVimMode.NORMAL);
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
        
        const lastLine = vimEditor.editor.document.lineAt(Math.min(currentLine + amplifier - 1, maxLine));

        let firstRange = vimEditor.editor.document.lineAt(currentLine).rangeIncludingLineBreak;
        const lastRange = lastLine.rangeIncludingLineBreak;
    
        if(lastLine.range.end.line === maxLine && firstRange.start.line > 0) {
            firstRange = new Range(vimEditor.editor.document.lineAt(firstRange.start.line - 1).range.end, firstRange.end);
        }

        deleteRange(vimEditor, new Range(firstRange.start, lastRange.end));
    }
}