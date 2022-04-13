import { SFVimEditor } from "../types/SFVimEditor";
import { executeCopyUntilPrevious } from "./copyUntilPrevious.command";

export function executeCopyUntilPreviousSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeCopyUntilPrevious(vimEditor, amplifier, true);
}