import * as vscode from "vscode";
import { SFVim } from "../sfvim";

export enum SFVimMode {
    NORMAL = 1,
    INSERT = 1 << 1,
    VISUAL = 1 << 2
}

export type StatusCallback = (vimEditor: SFVimEditor) => void;

export class SFVimEditor {
    editor: vscode.TextEditor;
    sfvim: SFVim;
    mode: SFVimMode;
    tags: Map<string, any>;
    amplifier: number;
    stringAmplifier: string;
    statusCallback: StatusCallback;
    usedInsert: boolean;

    constructor(editor: vscode.TextEditor, sfvim: SFVim, statusCallback: StatusCallback) {
        this.editor = editor;
        this.sfvim = sfvim;
        this.mode = SFVimMode.NORMAL;
        this.tags = new Map<string, any>();
        this.amplifier = 0;
        this.stringAmplifier = "";
        this.usedInsert = false;
        this.statusCallback = statusCallback;
    }

    changeMode(mode: SFVimMode) {
        this.mode = mode;

        if(mode & SFVimMode.INSERT) {
            this.usedInsert = true;
        }
    }

    callStatusCallback() {
        this.statusCallback(this);
    }
}