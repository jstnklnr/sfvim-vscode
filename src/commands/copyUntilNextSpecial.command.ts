import { SFVimEditor } from "../types/SFVimEditor";
import { executeCopyUntilNext } from "./copyUntilnext.command";

export function executeCopyUntilNextSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeCopyUntilNext(vimEditor, amplifier, true);
}