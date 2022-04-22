import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandCutUntilNext } from "./cutUntilNext.command";

export class CommandCutUntilNextSpecial extends SFVimCommand {
    constructor() {
        super("cut.untilNextSpecialWord", "Cuts all characters from the current to the next occurring word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandCutUntilNext.instance().cutUntilNext(vimEditor, amplifier, true);
    }
}