import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { isAdjustedPostion, getLeftPosition, getRightPosition } from "../../utilities/selection.util";

export class CommandSelectionSwap extends SFVimCommand {
    constructor() {
        super("selection.swap", "Swaps the anchor position with the active position", SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        let anchor = vimEditor.tags.get("anchor");
    
        if(!anchor) {
            return;
        }
    
        let active = vimEditor.editor.selection.active;
    
        if(isAdjustedPostion(anchor, active)) {
            active = getLeftPosition(active);
        }else {
            anchor = getRightPosition(anchor);
        }
    
        vimEditor.tags.set("anchor", active);
        handleSelection(vimEditor, anchor);
    }
}