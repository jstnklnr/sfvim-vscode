import { Position } from "vscode";
import { SFVimCommandHandler } from "../../handlers/command.handler";
import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { SFVimKeyHandler } from "../../types/SFVimKeyHandler";
import { getOffsetPosition, getRightPosition, isAdjustedPostion } from "../../utilities/selection.util";
import { CommandSearchNextOccurance } from "./searchNextOccurance.command";

export class CommandSearchInline extends SFVimCommand implements SFVimKeyHandler {
    private static _instance: CommandSearchInline;

    constructor() {
        super("search.inline", "Searches the pressed key in the current line", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandSearchInline {
        return CommandSearchInline._instance || new CommandSearchInline();
    }

    handleKey(vimEditor: SFVimEditor, key: string): boolean {
        if(key === "\n") {
            SFVimCommandHandler.instance().unregisterKeyHandler(this);
            return true;
        }
      
        const occurances = this.search(vimEditor, key);
        vimEditor.tags.set("searchOccurances", occurances);
        vimEditor.tags.set("lastSearchedCharacter", key);

        if(occurances.length > 0) {
            CommandSearchNextOccurance.instance().execute(vimEditor, 0, false);
        }

        SFVimCommandHandler.instance().unregisterKeyHandler(this);
        return true;
    }

    public search(vimEditor: SFVimEditor, character: string): Array<Position> {
        const selection = vimEditor.editor.selection;
        const activeLine = selection.active.line;
        const text = vimEditor.editor.document.lineAt(activeLine).text;
        const occurances: Array<Position> = [];

        for(let i = 0; i < text.length; i++) {
            if(text[i] === character) {
                occurances.push(new Position(activeLine, i));
            }
        }

        return occurances;
    }

    public execute(_: SFVimEditor, amplifier: number): void {
        if(amplifier !== 0) {
            return;
        }
    
        SFVimCommandHandler.instance().registerKeyHandler(this);
    }
}