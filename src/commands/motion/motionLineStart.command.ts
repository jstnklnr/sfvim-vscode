import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../../utilities/selection.util";

export class CommandMotionLineStart extends SFVimCommand {
    private static _instance: CommandMotionLineStart;

    constructor() {
        super("motion.lineStart", "Moves the cursor to the first character of the line", SFVimMode.NORMAL | SFVimMode.VISUAL);
        CommandMotionLineStart._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandMotionLineStart {
        return CommandMotionLineStart._instance || new CommandMotionLineStart();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        const currentPosition = vimEditor.editor.selection.active;
        const lineText = vimEditor.editor.document.lineAt(currentPosition.line).text;
        let character = 0;
        
        while(character < lineText.length - 1 && /^\s$/.exec(lineText[character])?.length) {
            character++;
        }
    
        let newPosition = vimEditor.editor.selection.active.with(currentPosition.line, character);
        let anchor = newPosition;
    
        if(vimEditor.mode & SFVimMode.VISUAL) {
            anchor = vimEditor.tags.get("anchor") || newPosition;
            newPosition = isAdjustedPostion(anchor, newPosition) ? getRightPosition(newPosition) : newPosition;
        }
    
        handleSelection(vimEditor, newPosition);
        vimEditor.tags.set("lastCharacter", newPosition.character);
    }
}