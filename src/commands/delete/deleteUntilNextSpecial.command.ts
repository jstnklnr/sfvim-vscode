import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandDeleteUntilNext } from "./deleteUntilNext.command";

export class CommandDeleteUntilNextSpecial extends SFVimCommand {
    constructor() {
        super("delete.untilNextSpecialWord", "Deletes all characters from the current to the next occuring word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandDeleteUntilNext.instance().deleteUntilNext(vimEditor, amplifier, true);
    }
}