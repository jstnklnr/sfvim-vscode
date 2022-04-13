import { SFVimEditor } from "../types/SFVimEditor";
import { executeCutUntilNext } from "./cutUntilNext.command";

export function executeCutUntilNextSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeCutUntilNext(vimEditor, amplifier, true);
}