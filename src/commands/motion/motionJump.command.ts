import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimEditor, SFVimMode } from "../../types/SFVimEditor";
import { getRightPosition, isAdjustedPostion } from "../../utilities/selection.util";

export class CommandMotionJump extends SFVimCommand {
    private static _instance: CommandMotionJump;

    constructor() {
        super("motion.jump", "Jumps to the beginning of specified line", SFVimMode.NORMAL | SFVimMode.VISUAL);
        CommandMotionJump._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandMotionJump {
        return CommandMotionJump._instance || new CommandMotionJump();
    }

    public execute(vimEditor: SFVimEditor, line: number): void {
        if(line === 0) {
            return;
        }
        
        const lineCount = vimEditor.editor.document.lineCount;
        line = line > lineCount ? lineCount : line;
        
        const lineText = vimEditor.editor.document.lineAt(line - 1).text;
        let character = 0;
        
        while(character < lineText.length - 1 && /^\s$/.exec(lineText[character])?.length) {
            character++;
        }
    
        let newPosition = vimEditor.editor.selection.active.with(line - 1, character);
        let anchor = newPosition;
    
        if(vimEditor.mode & SFVimMode.VISUAL) {
            anchor = vimEditor.tags.get("anchor") || newPosition;
            newPosition = isAdjustedPostion(anchor, newPosition) ? getRightPosition(newPosition) : newPosition;
        }
    
        vimEditor.tags.set("lastCharacter", newPosition.character);
        handleSelection(vimEditor, newPosition);
    }
}