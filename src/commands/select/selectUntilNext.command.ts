import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeToNextWord } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandSelectUntilNext extends SFVimCommand {
    private static _instance: CommandSelectUntilNext;

    constructor() {
        super("select.untilNextWord", "Selects all characters from the current to the next occuring word", SFVimMode.NORMAL);
        CommandSelectUntilNext._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandSelectUntilNext {
        return CommandSelectUntilNext._instance || new CommandSelectUntilNext();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.selectUntilNext(vimEditor, amplifier, false);
    }

    public selectUntilNext(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const range = getRangeToNextWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
        
        if(!range) {
            return;
        }
    
        CommandModeVisual.instance().execute(vimEditor, 0);
        vimEditor.tags.set("anchor", range.start);
        handleSelection(vimEditor, range.end);
    }
}