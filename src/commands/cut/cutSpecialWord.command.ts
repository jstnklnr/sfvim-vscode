import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { CommandCutWord } from "./cutWord.command";

export class CommandCutSpecialWord extends SFVimCommand {
    constructor() {
        super("cut.specialWord", "Cuts all characters of the current word (including special characters)", SFVimMode.NORMAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        CommandCutWord.instance().cutWord(vimEditor, amplifier, true);
    }
}