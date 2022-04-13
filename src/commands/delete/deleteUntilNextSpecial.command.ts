import { SFVimEditor } from "../types/SFVimEditor";
import { executeDeleteUntilNext } from "./deleteUntilNext.command";

export function executeDeleteUntilNextSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeDeleteUntilNext(vimEditor, amplifier, true);
}