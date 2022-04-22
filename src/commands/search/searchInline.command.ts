import { Position } from "vscode";
import { SFVimCommandHandler } from "../../handlers/command.handler";
import { handleSelection } from "../../handlers/selection.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { SFVimKeyHandler } from "../../types/SFVimKeyHandler";
import { getOffsetPosition, getRightPosition, isAdjustedPostion } from "../../utilities/selection.util";

export class CommandSearchInline extends SFVimCommand implements SFVimKeyHandler {
    constructor() {
        super("search.inline", "Searches the pressed key in the current line", SFVimMode.NORMAL | SFVimMode.VISUAL);
    }

    handleKey(vimEditor: SFVimEditor, key: string): boolean {
        if(key === "\n") {
            SFVimCommandHandler.instance().unregisterKeyHandler(this);
            return true;
        }

        const selection = vimEditor.editor.selection;
        const activeLine = selection.active.line;
        const text = vimEditor.editor.document.lineAt(activeLine).text;
        const occurances: Array<Position> = [];

        for(let i = 0; i < text.length; i++) {
            if(text[i] === key) {
                occurances.push(new Position(activeLine, i));
            }
        }

        if(occurances.length > 0) {
            let newPosition = getOffsetPosition(occurances[0], 0, 0);

            if(vimEditor.mode & SFVimMode.VISUAL && isAdjustedPostion(selection.anchor, newPosition)) {
                newPosition = getRightPosition(newPosition);
            }

            handleSelection(vimEditor, newPosition);
        }

        vimEditor.tags.set("searchOccurances", occurances);
        SFVimCommandHandler.instance().unregisterKeyHandler(this);
        return true;
    }

    public execute(_: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        SFVimCommandHandler.instance().registerKeyHandler(this);
    }
}