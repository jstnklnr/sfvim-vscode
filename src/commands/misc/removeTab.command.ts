import { Range, WorkspaceConfiguration } from "vscode";
import { SFVimConfigManager } from "../../handlers/config.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getStartOfLine, getOffsetPosition } from "../../utilities/selection.util";

export class CommandRemoveTab extends SFVimCommand {
    private config: WorkspaceConfiguration;

    constructor() {
        super("tab.remove", "Removes a tab at the start of the line", SFVimMode.NORMAL | SFVimMode.VISUAL);
        this.config = SFVimConfigManager.instance().getConfig("editor")!;
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier == 0) {
            amplifier = 1;
        }
    
        const selection = vimEditor.editor.selection;
        const tabSize = this.config.get("tabSize") as number;
        const maxSpaces = tabSize * amplifier;
    
        let startLine = selection.active.line;
        let endLine = selection.anchor.line;
    
        if(startLine > endLine) {
            [startLine, endLine] = [endLine, startLine];
        }
    
        vimEditor.editor.edit(editBuilder => {
            for(let i = startLine; i <= endLine; i++) {
                const lineText = vimEditor.editor.document.lineAt(i).text;
                let spaceCount = 0;
    
                for(; spaceCount < maxSpaces; spaceCount++) {
                    if(!/\s/.exec(lineText[spaceCount])) {
                        break;
                    }
                }
                
                if(spaceCount <= 0) {
                    continue;
                }
    
                const start = getStartOfLine(vimEditor, i);
                const range = new Range(start, getOffsetPosition(start, 0, spaceCount));
                editBuilder.delete(range);
            }
        });
    }
}