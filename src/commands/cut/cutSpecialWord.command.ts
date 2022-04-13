import { SFVimEditor } from "../types/SFVimEditor";
import { executeCutWord } from "./cutWord.command";

export function executeCutSpecialWord(vimEditor: SFVimEditor, amplifier: number) {
    executeCutWord(vimEditor, amplifier, true);
}