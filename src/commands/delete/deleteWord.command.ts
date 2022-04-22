import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeOfWord, deleteRange } from "../../utilities/selection.util";

export class CommandDeleteWord extends SFVimCommand {
    private static _instance: CommandDeleteWord;

    constructor() {
        super("delete.word", "Deletes the word that is currently under the cursor", SFVimMode.NORMAL);
        CommandDeleteWord._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandDeleteWord {
        return CommandDeleteWord._instance || new CommandDeleteWord;
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.deleteWord(vimEditor, amplifier, false);
    }

    public deleteWord(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier != 0) {
            return;
        }
    
        const range = getRangeOfWord(vimEditor, vimEditor.editor.selection.active, includeSpecial);
    
        if(!range) {
            return;
        }
    
        deleteRange(vimEditor, range);
    }
}