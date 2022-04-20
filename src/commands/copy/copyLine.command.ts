import { Range } from "vscode";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { copyRange } from "../../utilities/selection.util";

export class CommandCopy extends SFVimCommand {
    constructor() {
        super("copy.line", "Copies the current line", SFVimMode.NORMAL);
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
        const lastRange = vimEditor.editor.document.lineAt(Math.min(currentLine + amplifier - 1, maxLine)).range;
    
        copyRange(vimEditor, new Range(firstRange.start, lastRange.end));
    }
}