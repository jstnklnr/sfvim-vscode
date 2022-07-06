import * as vscode from "vscode";
export enum SFVimMode {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NORMAL = 1,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    INSERT = 1 << 1,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    VISUAL = 1 << 2
}

export type StatusCallback = (vimEditor: SFVimEditor) => void;

export class SFVimEditor {
    editor: vscode.TextEditor;
    mode: SFVimMode;
    tags: Map<string, any>;
    amplifier: number;
    stringAmplifier: string;
    statusCallback: StatusCallback;

    constructor(editor: vscode.TextEditor, statusCallback: StatusCallback) {
        this.editor = editor;
        this.mode = SFVimMode.NORMAL;
        this.tags = new Map<string, any>();
        this.amplifier = 0;
        this.stringAmplifier = "";
        this.statusCallback = statusCallback;
    }

    changeMode(mode: SFVimMode) {
        this.mode = mode;
    }

    callStatusCallback() {
        this.statusCallback(this);
    }
}