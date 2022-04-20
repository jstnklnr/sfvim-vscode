import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeToNextWord, copyRange } from "../../utilities/selection.util";

export class CommandCopyUntilNext extends SFVimCommand {
    private static _instance: CommandCopyUntilNext;

    constructor() {
        super("copy.untilNextWord", "Copies all characters from the current to the next occurring word", SFVimMode.NORMAL);
        CommandCopyUntilNext._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandCopyUntilNext {
        return CommandCopyUntilNext._instance || new CommandCopyUntilNext();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.copyUntilNext(vimEditor, amplifier, false);
    }

    public copyUntilNext(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const range = getRangeToNextWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
        
        if(!range) {
            return;
        }
    
        copyRange(vimEditor, range);
    }
}