import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeToPreviousWord, copyRange } from "../../utilities/selection.util";

export class CommandCopyUntilPrevious extends SFVimCommand {
    private static _instance: CommandCopyUntilPrevious;

    constructor() {
        super("copy.untilPreviousWord", "Copies all characters from the current to the previous occurring word", SFVimMode.NORMAL);
        CommandCopyUntilPrevious._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandCopyUntilPrevious {
        return CommandCopyUntilPrevious._instance || new CommandCopyUntilPrevious();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.copyUntilPrevious(vimEditor, amplifier, false);
    }

    public copyUntilPrevious(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const range = getRangeToPreviousWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
    
        if(!range) {
            return;
        }
    
        copyRange(vimEditor, range);
    }
}