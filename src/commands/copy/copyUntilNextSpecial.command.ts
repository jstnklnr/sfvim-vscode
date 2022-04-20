import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandCopyUntilNext } from "./copyUntilnext.command";

export class CommandCopyUntilNextSpecial extends SFVimCommand {
    constructor() {
        super("copy.untilNextSpecialWord", "Copies all characters from the current to the next occurring word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        CommandCopyUntilNext.instance().copyUntilNext(vimEditor, amplifier, true);
    }
}