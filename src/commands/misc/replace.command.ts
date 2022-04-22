import { Range } from "vscode";
import { SFVimCommandHandler } from "../../handlers/command.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { SFVimKeyHandler } from "../../types/SFVimKeyHandler";
import { getRightPosition } from "../../utilities/selection.util";

export class CommandReplace extends SFVimCommand implements SFVimKeyHandler {
    constructor() {
        super("replace", "Replaces the current character with the next pressed key", SFVimMode.NORMAL);
    }

    handleKey(vimEditor: SFVimEditor, key: string): boolean {
        const location = vimEditor.editor.selection.active;

        vimEditor.editor.edit(editBuilder => {
            editBuilder.replace(new Range(location, getRightPosition(location)), key);
        }).then(() => {
            SFVimCommandHandler.instance().unregisterKeyHandler(this);
        });

        return true;
    }

    public execute(_: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        SFVimCommandHandler.instance().registerKeyHandler(this);
    }
}