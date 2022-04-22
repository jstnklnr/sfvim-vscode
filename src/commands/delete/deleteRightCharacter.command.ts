import { Range } from "vscode";
import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRightPosition, getEndOfLine, getLeftPosition } from "../../utilities/selection.util";

export class CommandDeleteRightCharacter extends SFVimCommand {
    constructor() {
        super("delete.rightCharacter", "Deletes the characters that is next to the cursor (right side)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const active = getRightPosition(vimEditor.editor.selection.active);
        const lineEnd = getEndOfLine(vimEditor, active.line);
        const deleteEnd = active.character >= lineEnd.character
                        ? vimEditor.editor.document.lineAt(lineEnd.line).rangeIncludingLineBreak.end
                        : getRightPosition(active);
    
        vimEditor.editor.edit(editBuilder => {
            editBuilder.delete(new Range(active, deleteEnd));
        }).then(() => {
            handleSelection(vimEditor, getLeftPosition(active));
        });
    }
}