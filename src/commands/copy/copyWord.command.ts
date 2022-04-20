import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeOfWord, copyRange } from "../../utilities/selection.util";

export class CommandCopyWord extends SFVimCommand {
    private static _instance: CommandCopyWord;

    constructor() {
        super("copy.word", "Copies all characters of the current word", SFVimMode.NORMAL);
        CommandCopyWord._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandCopyWord {
        return CommandCopyWord._instance || new CommandCopyWord();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.copyWord(vimEditor, amplifier, false);
    }

    public copyWord(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier != 0) {
            return;
        }
    
        const range = getRangeOfWord(vimEditor, vimEditor.editor.selection.active, includeSpecial);
    
        if(!range) {
            return;
        }
    
        copyRange(vimEditor, range);
    }
}