import { Range } from "vscode";
import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRightPosition, getLeftPosition } from "../../utilities/selection.util";

export class CommandDeleteCharacterMoveLeft extends SFVimCommand {
    constructor() {
        super("delete.characterMoveLeft", "Deletes the characters that is currently under the cursor and moves one character to the left", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const active = vimEditor.editor.selection.active;
    
        vimEditor.editor.edit(editBuilder => {
            editBuilder.delete(new Range(active, getRightPosition(active)));
        }).then(() => {
            handleSelection(vimEditor, getLeftPosition(active));
        });
    }
}