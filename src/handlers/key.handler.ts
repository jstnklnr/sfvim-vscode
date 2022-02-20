/*import * as vscode from "vscode";
import { executeMotionDown } from "../commands/motionDown.command";
import { executeMotionUp } from "../commands/motionUp.command";

interface SFVimCommand {
    name: string;
    mode: number;
    description: string;
    handler: (editor: vscode.TextEditor, amplifier: number) => void;
}

interface SFVimBind {
    command: string;
    bind: string;
}

const commands: Array<SFVimCommand> = [
    {
        name: "mode.normal",
        mode: SFVimMode.INSERT,
        description: "Switches the current editor mode to NORMAL",
        handler: (editor) => changeMode(SFVimMode.NORMAL, editor)
    },
    {
        name: "mode.insert",
        mode: SFVimMode.NORMAL,
        description: "Switches the current editor mode to INSERT",
        handler: (editor) => changeMode(SFVimMode.INSERT, editor)
    },
    {
        name: "motion.up",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the line above",
        handler: executeMotionUp
    },
    {
        name: "motion.down",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the line below",
        handler: executeMotionDown
    }
];

let modeStatus: vscode.StatusBarItem;
let amplifierStatus: vscode.StatusBarItem; 

let mode = SFVimMode.NORMAL;
let config: any = {};

let lastKeys: string = "";
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

function changeMode(newMode: SFVimMode, editor?: vscode.TextEditor) {
    mode = newMode;
    modeStatus.text = mode === SFVimMode.NORMAL ? "-- NORMAL --" : "-- INSERT --";
    modeStatus.show();

    if(!editor) {
        return;
    }

    const isRelative = mode === SFVimMode.NORMAL ? config["normalModeLineNumberRelative"] : config["insertModeLineNumberRelative"];
    editor.options.lineNumbers = isRelative ? vscode.TextEditorLineNumbersStyle.Relative : vscode.TextEditorLineNumbersStyle.On;
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
    const currentTime = Date.now();

    if(currentTime - 500 > lastKeyPress) {
        lastKeys = "";
    }
    
    if(event === undefined || editor === undefined) {
        return;
    }
    
    const currentMode = mode;
    const key: string = event.text;

    if(key === undefined || key === "\n") {
        if(currentMode === SFVimMode.NORMAL) {
            event.preventDefault();
        }

        return;
    }

    if(currentMode === SFVimMode.NORMAL && /^\d+$/.exec(key)?.length) {
        updateAmplifier(key);
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

    const pressedKeys = `${lastKeys}${key}`;
    const potential = binds.filter(bind => bind.bind.startsWith(pressedKeys));

    const called = potential.filter(bind => 
        currentTime - 500 <= lastKeyPress && bind.bind === pressedKeys || bind.bind === key
    );

    const calledCommands = called.map(bind => bind.command);
    const trigger = commands.filter(command => calledCommands.includes(command.name));

    if(mode === SFVimMode.INSERT && trigger.length > 0) {
        const line = editor.selection.active.line;
        const character = editor.selection.active.character;

        editor.edit(editBuilder => {
            editBuilder.delete(new vscode.Range(line, character - (pressedKeys.length - 1), line, character));
        });
    }

    for(const command of trigger) {
        command.handler(editor, amplifier);
    }
    
    amplifier = trigger.length > 0 ? 0 : amplifier;
    
    if(amplifier == 0) {
        amplifierStatus.hide();
    }
    
    if(potential.length > 0) {
        lastKeys += key;
        lastKeyPress = currentTime;
    }
    
    if(trigger.length > 0) {
        lastKeys = "";
        event.preventDefault();
    }

    if(currentMode === SFVimMode.NORMAL) {
        event.preventDefault();
    }
}*/