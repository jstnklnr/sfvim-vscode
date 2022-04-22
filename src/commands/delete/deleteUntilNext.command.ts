import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeToNextWord, deleteRange } from "../../utilities/selection.util";

export class CommandDeleteUntilNext extends SFVimCommand {
    private static _instance: CommandDeleteUntilNext;

    constructor() {
        super("delete.untilNextWord", "Deletes all characters from the current to the next occuring word", SFVimMode.NORMAL);
        CommandDeleteUntilNext._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandDeleteUntilNext {
        return CommandDeleteUntilNext._instance || new CommandDeleteUntilNext;
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.deleteUntilNext(vimEditor, amplifier, false);
    }

    public deleteUntilNext(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const range = getRangeToNextWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
        
        if(!range) {
            return;
        }
    
        deleteRange(vimEditor, range);
    }
}