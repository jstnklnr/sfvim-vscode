import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeToPreviousWord, copyRange, deleteRange } from "../../utilities/selection.util";

export class CommandCutUntilPrevious extends SFVimCommand {
    private static _instance: CommandCutUntilPrevious;

    constructor() {
        super("cut.untilPreviousWord", "Cuts all characters from the current to the previous occurring word", SFVimMode.NORMAL);
        CommandCutUntilPrevious._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandCutUntilPrevious {
        return CommandCutUntilPrevious._instance || new CommandCutUntilPrevious;
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.cutUntilPrevious(vimEditor, amplifier, false);
    }

    public cutUntilPrevious(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const range = getRangeToPreviousWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
    
        if(!range) {
            return;
        }
    
        copyRange(vimEditor, range);
        deleteRange(vimEditor, range);
    }
}