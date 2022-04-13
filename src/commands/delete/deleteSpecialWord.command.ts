import { SFVimEditor } from "../types/SFVimEditor";
import { executeDeleteWord } from "./deleteWord.command";


export function executeDeleteSpecialWord(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    executeDeleteWord(vimEditor, amplifier, true);
}