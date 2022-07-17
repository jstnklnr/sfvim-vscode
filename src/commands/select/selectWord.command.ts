import { Selection } from "vscode";
import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getRangeOfWord } from "../../utilities/selection.util";
import { CommandModeVisual } from "../mode/modeVisual.command";

export class CommandSelectWord extends SFVimCommand {
    private static _instance: CommandSelectWord;

    constructor() {
        super("select.word", "Selects the word that is currently under the cursor", SFVimMode.NORMAL);
        CommandSelectWord._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandSelectWord {
        return CommandSelectWord._instance || new CommandSelectWord();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        this.selectWord(vimEditor, amplifier, false);
    }

    public selectWord(vimEditor: SFVimEditor, amplifier: number, includeSpecial: boolean = false) {
        if(amplifier !== 0) {
            return;
        }
    
        const range = getRangeOfWord(vimEditor, vimEditor.editor.selection.active, includeSpecial);
    
        if(!range) {
            return;
        }
    
        CommandModeVisual.instance().execute(vimEditor, 0);
        vimEditor.tags.set("anchor", range.start);
        vimEditor.editor.selection = new Selection(range.start, vimEditor.editor.selection.active);
        handleSelection(vimEditor, range.end);
    }
}