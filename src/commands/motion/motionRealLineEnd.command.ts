import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../../utilities/selection.util";

export class CommandMotionRealLineEnd extends SFVimCommand {
    private static _instance: CommandMotionRealLineEnd;

    constructor() {
        super("motion.realLineEnd", "Moves the cursor to the end of the line", SFVimMode.NORMAL | SFVimMode.VISUAL);
        CommandMotionRealLineEnd._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandMotionRealLineEnd {
        return CommandMotionRealLineEnd._instance || new CommandMotionRealLineEnd();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier !== 0) {
            return;
        }

        this.moveLast(vimEditor);
    }

    public moveLast(vimEditor: SFVimEditor): Promise<unknown> {
        const currentPosition = vimEditor.editor.selection.active;
        const lineText = vimEditor.editor.document.lineAt(currentPosition.line).text;
        let character = lineText.length === 0 ? 0 : lineText.length - 1;
    
        let newPosition = vimEditor.editor.selection.active.with(currentPosition.line, character);
        let anchor = newPosition;
    
        if(vimEditor.mode & SFVimMode.VISUAL) {
            anchor = vimEditor.tags.get("anchor") || newPosition;
            newPosition = isAdjustedPostion(anchor, newPosition) ? getRightPosition(newPosition) : newPosition;
        }
    
        const promise = handleSelection(vimEditor, newPosition);
        vimEditor.tags.set("lastCharacter", newPosition.character);    

        return promise;
    }
}