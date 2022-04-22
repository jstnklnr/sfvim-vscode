import { WorkspaceConfiguration } from "vscode";
import { SFVimConfigHandler } from "../../handlers/config.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getStartOfLine } from "../../utilities/selection.util";

export class CommandAddTab extends SFVimCommand {
    private config: WorkspaceConfiguration;

    constructor() {
        super("tab.add", "Adds a tab at the start of the line", SFVimMode.NORMAL | SFVimMode.VISUAL);
        this.config = SFVimConfigHandler.instance().getConfig("editor")!;
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const selection = vimEditor.editor.selection;
        let startLine = selection.active.line;
        let endLine = selection.anchor.line;
    
        if(startLine > endLine) {
            [startLine, endLine] = [endLine, startLine];
        }
    
        const tabSize = this.config.get("tabSize") as number;
        
        vimEditor.editor.edit(editBuilder => {
            for(let i = startLine; i <= endLine; i++) {
                const location = getStartOfLine(vimEditor, i);
                editBuilder.insert(location, " ".repeat(amplifier * tabSize));
            }
        });
    }
}