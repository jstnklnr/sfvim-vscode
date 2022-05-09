import { getVSCodeDownloadUrl } from "@vscode/test-electron/out/util";
import { TextEditorLineNumbersStyle, TextEditorCursorStyle, Selection, WorkspaceConfiguration } from "vscode";
import { SFVimConfigManager } from "../../handlers/config.handler";
import { SFVimCommand } from "../../types/SFVimCommand";
import { SFVimMode, SFVimEditor } from "../../types/SFVimEditor";
import { getLeftPosition } from "../../utilities/selection.util";
import * as vscode from "vscode";

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
        vimEditor.callStatusCallback();
    
        const newPosition = getLeftPosition(vimEditor.editor.selection.active);
        vimEditor.editor.selection = new Selection(newPosition, newPosition);
        vimEditor.tags.set("lastCharacter", newPosition.character);

        if(this.config.get("saveOnNormalModeSwitch")) {
            vscode.commands.executeCommand("workbench.action.files.save");
        }
    }
}