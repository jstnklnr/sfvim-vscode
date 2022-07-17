import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { getEndOfWord, getLeftPosition, getRightPosition, getStartOfLine, getStartOfPreviousWord, isAdjustedPostion } from "../../utilities/selection.util";

export class CommandMotionSkipEndLeft extends SFVimCommand {
    private static _instance: CommandMotionSkipEndLeft;
    
    constructor() {
        super("motion.skipEndLeft", "Moves the cursor to the end of the previous word", SFVimMode.NORMAL | SFVimMode.VISUAL);
        CommandMotionSkipEndLeft._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command 
     */
    public static instance(): CommandMotionSkipEndLeft {
        return CommandMotionSkipEndLeft._instance || new CommandMotionSkipEndLeft();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.motionSkipEndLeft(vimEditor, amplifier, false);
    }

    public motionSkipEndLeft(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier === 0) {
            amplifier = 1;
        }
    
        const visualMode = vimEditor.mode & SFVimMode.VISUAL;
        const anchor = vimEditor.tags.get("anchor") && vimEditor.editor.selection.anchor;
        let active = vimEditor.editor.selection.active;
        let wasAdjusted = false;

        if(visualMode && isAdjustedPostion(anchor, active)) {
            active = getLeftPosition(active);
            wasAdjusted = true;
        }
    
        for(let i = 0; i < amplifier; i++) {
            active = getStartOfPreviousWord(vimEditor, active, includeSpecial) || getStartOfLine(vimEditor, active.line);
        }
    
        active = getLeftPosition(getEndOfWord(vimEditor, active, includeSpecial)!);
        active = visualMode && wasAdjusted ? getRightPosition(active) : active;
        vimEditor.tags.set("lastCharacter", active.character);
        handleSelection(vimEditor, active);
    }
}