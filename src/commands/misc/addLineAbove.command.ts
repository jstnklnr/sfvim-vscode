import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getStartOfLine } from "../../utilities/selection.util";

export class CommandAddLineAbove extends SFVimCommand {
    constructor() {
        super("line.addAbove", "Adds a line above the current line", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const line = vimEditor.editor.selection.active.line;
    
        vimEditor.editor.edit(editBuilder => {
            editBuilder.insert(getStartOfLine(vimEditor, line), "\n".repeat(amplifier));
        });
    }
}