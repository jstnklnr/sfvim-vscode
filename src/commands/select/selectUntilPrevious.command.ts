import { Selection } from "vscode";
import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeToPreviousWord, getLeftPosition } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandSelectUntilPrevious extends SFVimCommand {
    private static _instance: CommandSelectUntilPrevious;

    constructor() {
        super("select.untilPreviousWord", "Selects all characters from the current to the previous occuring word", SFVimMode.NORMAL);
        CommandSelectUntilPrevious._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandSelectUntilPrevious {
        return CommandSelectUntilPrevious._instance || new CommandSelectUntilPrevious();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.selectUntilPrevious(vimEditor, amplifier, false);
    }

    public selectUntilPrevious(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier === 0) {
            amplifier = 1;
        }
    
        const range = getRangeToPreviousWord(vimEditor, vimEditor.editor.selection.active, amplifier, includeSpecial);
    
        if(!range) {
            return;
        }
    
        CommandModeVisual.instance().execute(vimEditor, 0);
        vimEditor.tags.set("anchor", getLeftPosition(range.end));
        vimEditor.editor.selection = new Selection(getLeftPosition(range.end), vimEditor.editor.selection.active);
        handleSelection(vimEditor, range.start);
    }
}