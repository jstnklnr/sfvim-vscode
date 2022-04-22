import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandDeleteWord } from "./deleteWord.command";

export class CommandDeleteSpecialWord extends SFVimCommand {
    constructor() {
        super("delete.specialWord", "Deletes the word that is currently under the cursor (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandDeleteWord.instance().deleteWord(vimEditor, amplifier, true);
    }
}