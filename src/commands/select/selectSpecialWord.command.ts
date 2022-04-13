import { SFVimEditor } from "../types/SFVimEditor";
import { executeSelectWord } from "./selectWord.command";

export function executeSelectSpecialWord(vimEditor: SFVimEditor, amplifier: number) {
    executeSelectWord(vimEditor, amplifier, true);
}