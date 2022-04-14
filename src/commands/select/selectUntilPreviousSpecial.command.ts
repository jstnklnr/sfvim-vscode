import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandSelectUntilPrevious } from "./selectUntilPrevious.command";

export class CommandSelectUntilNextSpecial extends SFVimCommand {
    constructor() {
        super("select.untilPreviousSpecialWord", "Selects all characters from the current to the previous occuring word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        CommandSelectUntilPrevious.instance().selectUntilPrevious(vimEditor, amplifier, true);
    }
}