import { Position } from "vscode";
import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getLeftPosition, getOffsetPosition, getRelativePosition, getRightPosition, getStartOfLine, isAdjustedPostion, RelativeDirection } from "../../utilities/selection.util";

export class CommandSearchPreviousOccurance extends SFVimCommand {
    constructor() {
        super("search.previousOccurance", "Moves the cursor to the previous occurance of the last search", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
        
        const occurances: Array<Position> = vimEditor.tags.get("searchOccurances");
        const selection = vimEditor.editor.selection;
        let location = selection.active;
        
        if(vimEditor.mode & SFVimMode.VISUAL && isAdjustedPostion(selection.anchor, location)) {
            location = getLeftPosition(location);
        }

        if(!occurances || occurances.length <= 0) {
            return;
        }

        for(let i = 0; i < amplifier; i++) {
            let noneFound = true;
            let lastOccurance = occurances[0];
    
            for(let occurance of occurances) {
                if(getRelativePosition(location, occurance) & (RelativeDirection.Equal | RelativeDirection.Right)) {
                    location = getOffsetPosition(lastOccurance, 0, 0);
                    noneFound = false;
                    break;
                }

                lastOccurance = occurance;
            }

            if(noneFound) {
                location = getOffsetPosition(occurances[occurances.length - 1], 0, 0);
            }
        }

        if(vimEditor.mode & SFVimMode.VISUAL && isAdjustedPostion(selection.anchor, location)) {
            location = getRightPosition(location);
        }

        handleSelection(vimEditor, location);
    }
}