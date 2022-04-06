import { SFVimEditor } from "../types/SFVimEditor";
import { executeSelectUntilNext } from "./selectUntilNext.command";

export function executeSelectUntilNextSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeSelectUntilNext(vimEditor, amplifier, true);
}