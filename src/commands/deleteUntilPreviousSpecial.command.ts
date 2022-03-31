import { Range } from "vscode";
import { SFVimEditor } from "../types/SFVimEditor";
import { deleteRange } from "../utilities/selection.util";
import { executeDeleteUntilPrevious } from "./deleteUntilPrevious.command";

export function executeDeleteUntilPreviousSpecial(vimEditor: SFVimEditor, amplifier: number) {
    executeDeleteUntilPrevious(vimEditor, amplifier, true);
}