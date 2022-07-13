import { SFVimEditor, SFVimMode } from "./types/SFVimEditor";
import { SFVimCommandHandler } from "./handlers/command.handler";
import * as vscode from "vscode";
import { CommandModeNormal } from "./commands/mode/modeNormal.command";
import { SFVimConfigManager } from "./handlers/config.handler";
import { cursorDecoration, getLeftPosition, getRightPosition, isAdjustedPostion } from "./utilities/selection.util";

export class SFVim {
    currentEditor?: SFVimEditor;
    editors: Array<SFVimEditor>;
    modeStatus: vscode.StatusBarItem;
    amplifierStatus: vscode.StatusBarItem;
    commandHandler: SFVimCommandHandler;
    sfvimConfig: vscode.WorkspaceConfiguration;

    constructor(context: vscode.ExtensionContext) {
        this.editors = [];
        this.modeStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        this.amplifierStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);

        new SFVimConfigManager(context, "sfvim", "editor");
        this.sfvimConfig = SFVimConfigManager.instance().getConfig("sfvim")!;

        this.currentEditor = this.getEditor(vscode.window.activeTextEditor);
        this.commandHandler = new SFVimCommandHandler();

        context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(() => this.checkEditors()));
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
            if(!editor) {
                return;
            }
            
            const selectionSubscribtion = vscode.window.onDidChangeTextEditorSelection((change) => {
                 this.currentEditor = this.getEditor(change.textEditor);
                 this.updateStatus(this.currentEditor);

                 selectionSubscribtion.dispose();
            });

            context.subscriptions.push(selectionSubscribtion);
            this.currentEditor = this.getEditor(editor);
            this.updateStatus(this.currentEditor);
        }));
        context.subscriptions.push(vscode.commands.registerCommand('type', (event) => {
            if(this.currentEditor) {
                this.commandHandler.handleKeys(this.currentEditor, event);
            }

            return vscode.commands.executeCommand('default:type', event);
        }));
        
        if(this.currentEditor) {
            CommandModeNormal.instance().execute(this.currentEditor, 0);
        }
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
            vimEditor = new SFVimEditor(editor, (_vimEditor) => {
                this.updateStatus(_vimEditor);
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

        if(vimEditor.amplifier === 0) {
            this.amplifierStatus.hide();
        }else {
            this.amplifierStatus.show();
        }

        if(vimEditor.mode & (SFVimMode.NORMAL | SFVimMode.VISUAL)) {
            const isRelative = this.sfvimConfig["normalModeLineNumberRelative"];
            vimEditor.editor.options.lineNumbers = isRelative ? vscode.TextEditorLineNumbersStyle.Relative : vscode.TextEditorLineNumbersStyle.On; 
            vimEditor.editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
        } 

        if(vimEditor.mode & SFVimMode.VISUAL) {
            const anchor = vimEditor.editor.selection.anchor;
            const active = vimEditor.editor.selection.active; 
            const lineRange = vimEditor.editor.document.lineAt(active).range;

            let range = new vscode.Range(active, getRightPosition(active));

            if(isAdjustedPostion(anchor, active)) {
                vimEditor.editor.options.cursorStyle = lineRange.end.character === 0 ? vscode.TextEditorCursorStyle.Block : vscode.TextEditorCursorStyle.Line;
                range = new vscode.Range(getLeftPosition(active), active);
            }

            vimEditor.editor.setDecorations(cursorDecoration, [range]);
        }else {
            vimEditor.editor.setDecorations(cursorDecoration, []); 
        }

        if(vimEditor.mode & SFVimMode.INSERT) {
            const isRelative = this.sfvimConfig["insertModeLineNumberRelative"];
            vimEditor.editor.options.lineNumbers = isRelative ? vscode.TextEditorLineNumbersStyle.Relative : vscode.TextEditorLineNumbersStyle.On;;
            vimEditor.editor.options.cursorStyle = vscode.TextEditorCursorStyle.Line;
        }
    }
}