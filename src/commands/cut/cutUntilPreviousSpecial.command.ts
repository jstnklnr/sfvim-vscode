import { SFVimEditor } from "../types/SFVimEditor";
import { executeCutUntilPrevious } from "./cutUntilPrevious.command";

export function executeCutUntilPreviousSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeCutUntilPrevious(vimEditor, amplifier, true);
}