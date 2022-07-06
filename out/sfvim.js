"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFVim = void 0;
const SFVimEditor_1 = require("./types/SFVimEditor");
const command_handler_1 = require("./handlers/command.handler");
const vscode = require("vscode");
const modeNormal_command_1 = require("./commands/mode/modeNormal.command");
const config_handler_1 = require("./handlers/config.handler");
const selection_util_1 = require("./utilities/selection.util");
class SFVim {
    constructor(context) {
        this.editors = [];
        this.modeStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        this.amplifierStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
        new config_handler_1.SFVimConfigManager(context, "sfvim", "editor");
        this.sfvimConfig = config_handler_1.SFVimConfigManager.instance().getConfig("sfvim");
        this.currentEditor = this.getEditor(vscode.window.activeTextEditor);
        this.commandHandler = new command_handler_1.SFVimCommandHandler();
        context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(() => this.checkEditors()));
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
            if (!editor) {
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
            if (this.currentEditor) {
                this.commandHandler.handleKeys(this.currentEditor, event);
            }
            return vscode.commands.executeCommand('default:type', event);
        }));
        modeNormal_command_1.CommandModeNormal.instance().execute(this.currentEditor, 0);
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
            vimEditor = new SFVimEditor_1.SFVimEditor(editor, (_vimEditor) => {
                this.updateStatus(_vimEditor);
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
        if (vimEditor.amplifier === 0) {
            this.amplifierStatus.hide();
        }
        else {
            this.amplifierStatus.show();
        }
        if (vimEditor.mode & (SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL)) {
            const isRelative = this.sfvimConfig["normalModeLineNumberRelative"];
            vimEditor.editor.options.lineNumbers = isRelative ? vscode.TextEditorLineNumbersStyle.Relative : vscode.TextEditorLineNumbersStyle.On;
            vimEditor.editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
        }
        if (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL) {
            const anchor = vimEditor.editor.selection.anchor;
            const active = vimEditor.editor.selection.active;
            const lineRange = vimEditor.editor.document.lineAt(active).range;
            let range = new vscode.Range(active, (0, selection_util_1.getRightPosition)(active));
            if ((0, selection_util_1.isAdjustedPostion)(anchor, active)) {
                vimEditor.editor.options.cursorStyle = lineRange.end.character === 0 ? vscode.TextEditorCursorStyle.Block : vscode.TextEditorCursorStyle.Line;
                range = new vscode.Range((0, selection_util_1.getLeftPosition)(active), active);
            }
            vimEditor.editor.setDecorations(selection_util_1.cursorDecoration, [range]);
        }
        else {
            vimEditor.editor.setDecorations(selection_util_1.cursorDecoration, []);
        }
        if (vimEditor.mode & SFVimEditor_1.SFVimMode.INSERT) {
            const isRelative = this.sfvimConfig["insertModeLineNumberRelative"];
            vimEditor.editor.options.lineNumbers = isRelative ? vscode.TextEditorLineNumbersStyle.Relative : vscode.TextEditorLineNumbersStyle.On;
            ;
            vimEditor.editor.options.cursorStyle = vscode.TextEditorCursorStyle.Line;
        }
    }
}
exports.SFVim = SFVim;
//# sourceMappingURL=sfvim.js.map