import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandDeleteUntilPrevious } from "./deleteUntilPrevious.command";

export class CommandDeleteUntilPreviousSpecial extends SFVimCommand {
    constructor() {
        super("delete.untilPreviousSpecialWord", "Deletes all characters from the current to the previous occuring word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandDeleteUntilPrevious.instance().deleteUntilPrevious(vimEditor, amplifier, true);
    }
}