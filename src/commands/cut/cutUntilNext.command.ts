import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeToNextWord, copyRange, deleteRange } from "../../utilities/selection.util";

export class CommandCutUntilNext extends SFVimCommand {
    private static _instance: CommandCutUntilNext;

    constructor() {
        super("cut.untilNextWord", "Cuts all characters from the current to the next occurring word", SFVimMode.NORMAL);
        CommandCutUntilNext._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandCutUntilNext {
        return CommandCutUntilNext._instance || new CommandCutUntilNext;
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.cutUntilNext(vimEditor, amplifier, false);
    }

    public cutUntilNext(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const range = getRangeToNextWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
        
        if(!range) {
            return;
        }
    
        copyRange(vimEditor, range);
        deleteRange(vimEditor, range);
    }
}