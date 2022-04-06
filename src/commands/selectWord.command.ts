import { handleSelection } from "../handlers/selection.handler";
import { SFVimEditor } from "../types/SFVimEditor";
import { getRangeOfWord} from "../utilities/selection.util";
import { executeModeChangeVisual } from "./modeVisual.command";

export function executeSelectWord(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
    if(amplifier != 0) {
        return;
    }

    const range = getRangeOfWord(vimEditor, vimEditor.editor.selection.active, includeSpecial);

    if(!range) {
        return;
    }

    executeModeChangeVisual(vimEditor, 0);
    vimEditor.tags.set("anchor", range.start);
    handleSelection(vimEditor, range.end);
}