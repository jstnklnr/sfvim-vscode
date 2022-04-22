import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeOfWord, copyRange, deleteRange } from "../../utilities/selection.util";

export class CommandCutWord extends SFVimCommand {
    private static _instance: CommandCutWord;

    constructor() {
        super("cut.word", "Cuts all characters of the current word", SFVimMode.NORMAL);
        CommandCutWord._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandCutWord {
        return CommandCutWord._instance || new CommandCutWord;
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.cutWord(vimEditor, amplifier, false);
    }

    public cutWord(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier != 0) {
            return;
        }
    
        const range = getRangeOfWord(vimEditor, vimEditor.editor.selection.active, includeSpecial);
    
        if(!range) {
            return;
        }
    
        copyRange(vimEditor, range);
        deleteRange(vimEditor, range);
    }
}