import { Selection } from "vscode";
import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor } from "../types/SFVimEditor";
import { getRangeToNextWord } from "../utilities/selection.util";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executeSelectUntilNext(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    const range = getRangeToNextWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
    
    if(!range) {
        return;
    }

    vimEditor.editor.selection = new Selection(range.start, range.end);
    executeModeChangeVisual(vimEditor, 0);
    handleSelection(vimEditor, vimEditor.editor.selection.active);
}