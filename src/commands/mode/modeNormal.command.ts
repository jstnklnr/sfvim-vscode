import { TextEditorLineNumbersStyle, TextEditorCursorStyle, Selection, WorkspaceConfiguration } from "vscode";
import { SFVimConfigManager } from "../../handlers/config.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getLeftPosition } from "../../utilities/selection.util";

export class CommandModeNormal extends SFVimCommand {
    private static _instance: CommandModeNormal;
    private config: WorkspaceConfiguration;

    constructor() {
        super("mode.normal", "Switches the current editor mode to NORMAL", SFVimMode.INSERT);
        CommandModeNormal._instance = this;
        this.config = SFVimConfigManager.instance().getConfig("sfvim")!;
    }

    /**
     * @returns the single instance that should exist of this command
     */
     public static instance(): CommandModeNormal {
        return CommandModeNormal._instance || new CommandModeNormal();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        if(amplifier != 0) {
            return;
        }
    
        vimEditor.changeMode(SFVimMode.NORMAL);
        const isRelative = this.config["normalModeLineNumberRelative"];
        vimEditor.editor.options.lineNumbers = isRelative ? TextEditorLineNumbersStyle.Relative : TextEditorLineNumbersStyle.On;
        vimEditor.callStatusCallback();
    
        vimEditor.editor.options.cursorStyle = TextEditorCursorStyle.Block;
        const newPosition = getLeftPosition(vimEditor.editor.selection.active);
        vimEditor.editor.selection = new Selection(newPosition, newPosition);
        vimEditor.tags.set("lastCharacter", newPosition.character);
    }
}