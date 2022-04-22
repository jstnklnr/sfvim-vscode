import { SFVimEditor, SFVimMode } from "./types/SFVimEditor";
import { CommandHandler } from "./handlers/command.handler";
import * as vscode from "vscode";
import { CommandModeNormal } from "./commands/mode/modeNormal.command";

export class SFVim {
    currentEditor?: SFVimEditor;
    editors: Array<SFVimEditor>;
    sfvimConfig: vscode.WorkspaceConfiguration;
    editorConfig: vscode.WorkspaceConfiguration;
    modeStatus: vscode.StatusBarItem;
    amplifierStatus: vscode.StatusBarItem;
    commandHandler: CommandHandler;

    constructor(context: vscode.ExtensionContext) {
        this.editors = [];
        this.modeStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        this.amplifierStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
        this.sfvimConfig = {} as unknown as vscode.WorkspaceConfiguration;
        this.editorConfig = {} as unknown as vscode.WorkspaceConfiguration;
        this.loadConfig();
        this.currentEditor = this.getEditor(vscode.window.activeTextEditor);
        this.commandHandler = new CommandHandler(this.sfvimConfig);

        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => this.loadConfig));
        context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(() => this.checkEditors()));
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
            this.currentEditor = this.getEditor(editor);
            this.updateStatus(this.currentEditor);
        }));
        context.subscriptions.push(vscode.commands.registerCommand('type', (event) => {
            if(this.currentEditor) {
                this.commandHandler.handleKeys(this.currentEditor, event);
            }

            return vscode.commands.executeCommand('default:type', event);
        }));
        
        CommandModeNormal.instance().execute(this.currentEditor!, 0);
    }

    loadConfig() {
        for(const key of Object.keys(this.sfvimConfig)) {
            delete (this.sfvimConfig as unknown as any)[key];
        }

        for(const key of Object.keys(this.editorConfig)) {
            delete (this.editorConfig as unknown as any)[key];
        }

        Object.assign(this.sfvimConfig, vscode.workspace.getConfiguration("sfvim"));
        Object.assign(this.editorConfig, vscode.workspace.getConfiguration("editor"));
    }

    checkEditors() {
        this.editors = this.editors.filter(vimEditor => vscode.workspace.textDocuments.includes(vimEditor.editor.document));
    }

    getEditor(editor?: vscode.TextEditor): SFVimEditor | undefined {
        if(!editor) {
            return undefined;
        }

        let vimEditor = this.editors.find(vimEditor => vimEditor.editor.document === editor.document);

        if(!vimEditor) {
            vimEditor = new SFVimEditor(editor, this, (_vimEditor) => {
                this.updateStatus(vimEditor);
            });

            this.editors.push(vimEditor);
        }

        vimEditor.editor = editor;
        return vimEditor;
    }

    updateStatus(vimEditor?: SFVimEditor) {
        if(!vimEditor || !this.modeStatus || !this.amplifierStatus) {
            return;
        }

        const status = vimEditor.mode === SFVimMode.INSERT ? "-- INSERT --" : (vimEditor.mode & SFVimMode.VISUAL ? "-- VISUAL --" : "-- NORMAL --");

        this.modeStatus.text = status;
        this.modeStatus.show();

        this.amplifierStatus.text = vimEditor.amplifier.toString();

        if(vimEditor.amplifier == 0) {
            this.amplifierStatus.hide();
        }else {
            this.amplifierStatus.show();
        }
    }
}