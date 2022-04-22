import { TextEditorLineNumbersStyle, TextEditorCursorStyle, WorkspaceConfiguration } from "vscode";
import { SFVimConfigHandler } from "../../handlers/config.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { cursorDecoration } from "../../utilities/selection.util";

export class CommandModeInsert extends SFVimCommand {
    private static _instance: CommandModeInsert;
    private config: WorkspaceConfiguration;

    constructor() {
        super("mode.insert", "Switches the current editor to INSERT mode and puts the cursor in front of the currently selected character", SFVimMode.NORMAL);
        CommandModeInsert._instance = this;
        this.config = SFVimConfigHandler.instance().getConfig("sfvim")!;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): CommandModeInsert {
        return CommandModeInsert._instance || new CommandModeInsert();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        vimEditor.changeMode(SFVimMode.INSERT);
        const isRelative = this.config!["insertModeLineNumberRelative"];
        vimEditor.editor.options.lineNumbers = isRelative ? TextEditorLineNumbersStyle.Relative : TextEditorLineNumbersStyle.On;;
        vimEditor.callStatusCallback();
    
        vimEditor.editor.options.cursorStyle = TextEditorCursorStyle.Line;
        vimEditor.editor.setDecorations(cursorDecoration, []);
    }
}