import { SFVimEditor } from "../types/SFVimEditor";
import { executeCopyWord } from "./copyWord.command";

export function executeCopySpecialWord(vimEditor: SFVimEditor, amplifier: number) {
    executeCopyWord(vimEditor, amplifier, true);
}