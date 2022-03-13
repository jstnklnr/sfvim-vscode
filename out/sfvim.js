"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFVim = void 0;
const SFVimEditor_1 = require("./types/SFVimEditor");
const command_handler_1 = require("./handlers/command.handler");
const vscode = require("vscode");
const modeNormal_command_1 = require("./commands/modeNormal.command");
class SFVim {
    constructor(context) {
        this.editors = [];
        this.modeStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        this.amplifierStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
        this.config = {};
        this.loadConfig();
        this.currentEditor = this.getEditor(vscode.window.activeTextEditor);
        this.commandHandler = new command_handler_1.CommandHandler(this.config);
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => this.loadConfig));
        context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(() => this.checkEditors()));
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
            this.currentEditor = this.getEditor(editor);
            this.updateStatus(this.currentEditor);
        }));
        context.subscriptions.push(vscode.commands.registerCommand('type', (event) => {
            if (this.currentEditor) {
                this.commandHandler.handleKeys(this.currentEditor, event);
            }
            return vscode.commands.executeCommand('default:type', event);
        }));
        (0, modeNormal_command_1.executeModeChangeNormal)(this.currentEditor, 0);
    }
    loadConfig() {
        for (const key of Object.keys(this.config)) {
            delete this.config[key];
        }
        Object.assign(this.config, vscode.workspace.getConfiguration("sfvim"));
    }
    checkEditors() {
        this.editors = this.editors.filter(vimEditor => vscode.workspace.textDocuments.includes(vimEditor.editor.document));
    }
    getEditor(editor) {
        if (!editor) {
            return undefined;
        }
        let vimEditor = this.editors.find(vimEditor => vimEditor.editor.document === editor.document);
        if (!vimEditor) {
            vimEditor = new SFVimEditor_1.SFVimEditor(editor, this.config, (_vimEditor) => {
                this.updateStatus(vimEditor);
            });
            this.editors.push(vimEditor);
        }
        vimEditor.editor = editor;
        return vimEditor;
    }
    updateStatus(vimEditor) {
        if (!vimEditor || !this.modeStatus || !this.amplifierStatus) {
            return;
        }
        const status = vimEditor.mode === SFVimEditor_1.SFVimMode.INSERT ? "-- INSERT --" : (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL ? "-- VISUAL --" : "-- NORMAL --");
        this.modeStatus.text = status;
        this.modeStatus.show();
        this.amplifierStatus.text = vimEditor.amplifier.toString();
        if (vimEditor.amplifier == 0) {
            this.amplifierStatus.hide();
        }
        else {
            this.amplifierStatus.show();
        }
    }
}
exports.SFVim = SFVim;
//# sourceMappingURL=sfvim.js.map