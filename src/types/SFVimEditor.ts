import * as vscode from "vscode";

export enum SFVimMode {
    NORMAL = 1,
    INSERT = 1 << 1
}

export type StatusCallback = (vimEditor: SFVimEditor) => void;

export class SFVimEditor {
    editor: vscode.TextEditor;
    config: any;
    mode: SFVimMode;
    tags: Map<string, any>;
    amplifier: number;
    stringAmplifier: string;
    statusCallback: StatusCallback;

    constructor(editor: vscode.TextEditor, config: any, statusCallback: StatusCallback) {
        this.editor = editor;
        this.config = config;
        this.mode = SFVimMode.NORMAL;
        this.tags = new Map<string, any>();
        this.amplifier = 0;
        this.stringAmplifier = "";
        this.statusCallback = statusCallback;
    }

    changeMode(mode: SFVimMode) {
        this.mode = mode;
        const isRelative = mode === SFVimMode.NORMAL ? this.config["normalModeLineNumberRelative"] : this.config["insertModeLineNumberRelative"];
        this.editor.options.lineNumbers = isRelative ? vscode.TextEditorLineNumbersStyle.Relative : vscode.TextEditorLineNumbersStyle.On;
        this.callStatusCallback();

        this.editor.options.cursorStyle = mode & SFVimMode.NORMAL ? vscode.TextEditorCursorStyle.Block : vscode.TextEditorCursorStyle.Line;
    }

    callStatusCallback() {
        this.statusCallback(this);
    }
}