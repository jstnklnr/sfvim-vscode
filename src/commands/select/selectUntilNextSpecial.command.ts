import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandSelectUntilNext } from "./selectUntilNext.command";

export class CommandSelectUntilNextSpecial extends SFVimCommand {
    constructor() {
        super("select.untilNextSpecialWord", "Selects all characters from the current to the next occuring word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        CommandSelectUntilNext.instance().selectUntilNext(vimEditor, amplifier, true);
    }
}