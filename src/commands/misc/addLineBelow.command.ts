import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getEndOfLine } from "../../utilities/selection.util";

export class CommandAddLineBelow extends SFVimCommand {
    constructor() {
        super("line.addBelow", "Adds a line below the current line", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const line = vimEditor.editor.selection.active.line;
    
        vimEditor.editor.edit(editBuilder => {
            editBuilder.insert(getEndOfLine(vimEditor, line), "\n".repeat(amplifier));
        });
    }
}