import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeToPreviousWord, deleteRange } from "../../utilities/selection.util";

export class CommandDeleteUntilPrevious extends SFVimCommand {
    private static _instance: CommandDeleteUntilPrevious;

    constructor() {
        super("delete.untilPreviousWord", "Deletes all characters from the current to the previous occuring word", SFVimMode.NORMAL);
        CommandDeleteUntilPrevious._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandDeleteUntilPrevious {
        return CommandDeleteUntilPrevious._instance || new CommandDeleteUntilPrevious;
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.deleteUntilPrevious(vimEditor, amplifier, false);
    }

    public deleteUntilPrevious(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const range = getRangeToPreviousWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
    
        if(!range) {
            return;
        }
    
        deleteRange(vimEditor, range);
    }
}