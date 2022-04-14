import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandSelectWord } from "./selectWord.command";

export class CommandSelectSpecialWord extends SFVimCommand {
    constructor() {
        super("select.specialWord", "Selects the word that is currently under the cursor", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        CommandSelectWord.instance().selectWord(vimEditor, amplifier, true);
    }
}