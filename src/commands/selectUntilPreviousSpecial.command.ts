import { SFVimEditor } from "../types/SFVimEditor";
import { executeSelectUntilPrevious } from "./selectUntilPrevious.command";

export function executeSelectUntilPreviousSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeSelectUntilPrevious(vimEditor, amplifier, true);
}