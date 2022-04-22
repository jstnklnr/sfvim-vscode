import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandCopyUntilPrevious } from "./copyUntilPrevious.command";

export class CommandCopyUntilPreviousSpecial extends SFVimCommand {
    constructor() {
        super("copy.untilPreviousSpecialWord", "Copies all characters from the current to the previous occurring word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        CommandCopyUntilPrevious.instance().copyUntilPrevious(vimEditor, amplifier, true);
    }
}