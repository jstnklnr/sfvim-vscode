import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { getLeftPosition, getRelativePosition, getRightPosition, getStartOfLine, getStartOfPreviousWord, getStartOfWord, isAdjustedPostion, RelativeDirection } from "../../utilities/selection.util";

export class CommandMotionSkipLeft extends SFVimCommand {
    private static _instance: CommandMotionSkipLeft;
    
    constructor() {
        super("motion.skipLeft", "Moves the cursor to the beginning of the previous word", SFVimMode.NORMAL | SFVimMode.VISUAL);
        CommandMotionSkipLeft._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command 
     */
    public static instance(): CommandMotionSkipLeft {
        return CommandMotionSkipLeft._instance || new CommandMotionSkipLeft();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.motionSkipLeft(vimEditor, amplifier, false);
    }

    public motionSkipLeft(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier === 0) {
            amplifier = 1;
        }
    
        const visualMode = vimEditor.mode & SFVimMode.VISUAL;
        const anchor = vimEditor.tags.get("anchor") || vimEditor.editor.selection.anchor;
        let active = vimEditor.editor.selection.active;
        let wasAdjusted = false; 

        if(visualMode && isAdjustedPostion(anchor, active)) {
            active = getLeftPosition(active);
            wasAdjusted = true;
        }
    
        const startOfCurrent = getStartOfWord(vimEditor, active, includeSpecial);
    
        if(startOfCurrent && getRelativePosition(startOfCurrent, active) === RelativeDirection.Right) {
            active = getStartOfWord(vimEditor, active, includeSpecial)!;
            amplifier--;
        }
    
        for(let i = 0; i < amplifier; i++) {
            active = getStartOfPreviousWord(vimEditor, active, includeSpecial) || getStartOfLine(vimEditor, active.line);
        }
    
        active = visualMode && wasAdjusted ? getRightPosition(active) : active;
        vimEditor.tags.set("lastCharacter", active.character);
        handleSelection(vimEditor, active);
    }
}