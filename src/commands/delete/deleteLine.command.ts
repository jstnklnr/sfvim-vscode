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
        
        const firstRange = vimEditor.editor.document.lineAt(currentLine).rangeIncludingLineBreak;
        const lastRange = vimEditor.editor.document.lineAt(Math.min(currentLine + amplifier - 1, maxLine)).rangeIncludingLineBreak;
    
        deleteRange(vimEditor, new Range(firstRange.start, lastRange.end)).then(async () => {
            if(currentLine === maxLine && currentLine > 0) {
                const line = vimEditor.editor.document.lineAt(currentLine - 1);
                await deleteRange(vimEditor, new Range(line.range.end, line.rangeIncludingLineBreak.end));
                handleSelection(vimEditor, vimEditor.editor.selection.active);
            }
        });

    }
}