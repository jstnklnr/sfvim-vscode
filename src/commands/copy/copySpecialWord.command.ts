import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandCopyWord } from "./copyWord.command";

export class CommandCopySpecialWord extends SFVimCommand {
    constructor() {
        super("copy.specialWord", "Copies all characters of the current word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        CommandCopyWord.instance().copyWord(vimEditor, amplifier, true);
    }
}