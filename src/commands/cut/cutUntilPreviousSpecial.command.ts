import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandCutUntilPrevious } from "./cutUntilPrevious.command";

export class CommandCutUntilPreviousSpecial extends SFVimCommand {
    constructor() {
        super("cut.untilPreviousSpecialWord", "Cuts all characters from the current to the previous occurring word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandCutUntilPrevious.instance().cutUntilPrevious(vimEditor, amplifier, true);
    }
}