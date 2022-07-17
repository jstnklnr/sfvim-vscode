import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { isAdjustedPostion, getLeftPosition, getStartOfNextWord, getEndOfLine, getRightPosition } from "../../utilities/selection.util";

export class CommandMotionSkipRight extends SFVimCommand {
    private static _instance: CommandMotionSkipRight;
    
    constructor() {
        super("motion.skipRight", "Moves the cursor to the beginning of the next word", SFVimMode.NORMAL | SFVimMode.VISUAL);
        CommandMotionSkipRight._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command 
     */
    public static instance(): CommandMotionSkipRight {
        return CommandMotionSkipRight._instance || new CommandMotionSkipRight();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.motionSkipRight(vimEditor, amplifier, false);
    }

    public motionSkipRight(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier === 0) {
            amplifier = 1;
        }
    
        const visualMode = vimEditor.mode & SFVimMode.VISUAL;
        const anchor = vimEditor.editor.selection.anchor;
        let active = vimEditor.editor.selection.active;
        let wasAdjusted = false;
    
        if(visualMode && isAdjustedPostion(anchor, active)) {
            active = getLeftPosition(active);
            wasAdjusted = true;
        }
    
        for(let i = 0; i < amplifier; i++) {
            active = getStartOfNextWord(vimEditor, active, includeSpecial) || getEndOfLine(vimEditor, active.line);
        }
    
        active = visualMode && wasAdjusted ? getRightPosition(active) : active;
        vimEditor.tags.set("lastCharacter", active.character);
        handleSelection(vimEditor, active);
    }
}