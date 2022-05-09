import { WorkspaceConfiguration } from "vscode";
import { SFVimConfigManager } from "../../handlers/config.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getStartOfLine, insert } from "../../utilities/selection.util";

export class CommandAddTab extends SFVimCommand {
    private config: WorkspaceConfiguration;

    constructor() {
        super("tab.add", "Adds a tab at the start of the line", SFVimMode.NORMAL | SFVimMode.VISUAL);
        this.config = SFVimConfigManager.instance().getConfig("editor")!;
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
    
        const detectIndentation = this.config.get("detectIndentation");

        const configInsertSpaces = this.config.get("insertSpaces");
        const editorInsertSpaces = vimEditor.editor.options.insertSpaces;

        const insertSpaces = detectIndentation ? editorInsertSpaces : configInsertSpaces;
        const tabCharacter = insertSpaces ? " " : "\t";
        
        const configTabSize = this.config.get("tabSize") as number;
        const editorTabSize = vimEditor.editor.options.tabSize;

        let tabSize = detectIndentation && typeof editorTabSize == "number"
                        ? editorTabSize
                        : configTabSize;


        tabSize = insertSpaces ? tabSize : 1;
        
        vimEditor.editor.edit(editBuilder => {
            for(let i = startLine; i <= endLine; i++) {
                const location = getStartOfLine(vimEditor, i);
                editBuilder.insert(location, tabCharacter.repeat(amplifier * tabSize));
            }
        });
    }
}