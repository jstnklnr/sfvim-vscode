import * as vscode from "vscode";

export enum SFVimMode {
    NORMAL = 1,
    INSERT = 1 << 1
}

interface SFVimCommand {
    name: string;
    mode: number;
    description: string;
    handler: (editor: vscode.TextEditor, amplifier: number) => void;
}

interface SFVimBind {
    command: string;
    bind: string;
    delay?: number;
}

const commands: Array<SFVimCommand> = [
    {
        name: "mode.normal",
        mode: SFVimMode.INSERT,
        description: "Switches the current editor mode to NORMAL",
        handler: () => changeMode(SFVimMode.NORMAL)
    },
    {
        name: "mode.insert",
        mode: SFVimMode.NORMAL,
        description: "Switches the current editor mode to INSERT",
        handler: () => changeMode(SFVimMode.INSERT)
    }
];

let modeStatus: vscode.StatusBarItem;
let amplifierStatus: vscode.StatusBarItem; 

let mode = SFVimMode.NORMAL;
let config: any = {};

let lastKey: string;
let lastKeyPress: number;

let stringAmplifier: string = "";
let amplifier: number;

export function setup() {
    loadConfig();
    
    modeStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    amplifierStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);

    changeMode(SFVimMode.NORMAL);
}

export function loadConfig() {
    config = vscode.workspace.getConfiguration("sfvim");
}

function changeMode(newMode: SFVimMode) {
    mode = newMode;
    modeStatus.text = mode === SFVimMode.NORMAL ? "-- NORMAL --" : "-- INSERT --";
    modeStatus.show();
}

function updateAmplifier(num: string) {
    const timeDifference = Date.now() - lastKeyPress;
    stringAmplifier = timeDifference > 500 ? num : stringAmplifier + num;
    amplifier = parseInt(stringAmplifier);
    amplifierStatus.text = stringAmplifier;
    amplifierStatus.show();
}

export function handleKeys(event: any) {
    const editor = vscode.window.activeTextEditor;
    
    if(event === undefined || editor === undefined) {
        return;
    }
    
    const currentMode = mode;
    const key: string = event.text;
    const currentTime = Date.now();

    if(key === undefined) {
        if(currentMode === SFVimMode.NORMAL) {
            event.preventDefault();
        }

        return;
    }

    if(currentMode === SFVimMode.NORMAL && /^\d+$/.exec(key)?.length) {
        updateAmplifier(key);

        lastKey = key;
        lastKeyPress = currentTime;

        event.preventDefault();
        return;
    }

    const binds: Array<SFVimBind> = currentMode === SFVimMode.NORMAL ? config["normalModeKeybindings"] : config["insertModeKeybindings"];

    if(binds === undefined) {
        if(mode === SFVimMode.NORMAL) {
            event.preventDefault();
        }

        return;
    }

    const called = binds.filter(bind => 
        bind.bind === key || typeof bind.delay === "number" && currentTime - bind.delay <= lastKeyPress && bind.bind === `${lastKey}${key}`
    ).map(bind => bind.command);

    const trigger = commands.filter(command => called.includes(command.name));

    for(const command of trigger) {
        command.handler(editor, amplifier);
    }

    amplifier = trigger.length > 0 ? 0 : amplifier;

    if(amplifier == 0) {
        amplifierStatus.hide();
    }

    lastKey = key;
    lastKeyPress = currentTime;

    if(currentMode === SFVimMode.NORMAL) {
        event.preventDefault();
    }
}