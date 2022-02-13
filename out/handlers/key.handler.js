"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleKeys = exports.loadConfig = exports.setup = exports.SFVimMode = void 0;
const vscode = require("vscode");
var SFVimMode;
(function (SFVimMode) {
    SFVimMode[SFVimMode["NORMAL"] = 1] = "NORMAL";
    SFVimMode[SFVimMode["INSERT"] = 2] = "INSERT";
})(SFVimMode = exports.SFVimMode || (exports.SFVimMode = {}));
const commands = [
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
let modeStatus;
let amplifierStatus;
let mode = SFVimMode.NORMAL;
let config = {};
let lastKey;
let lastKeyPress;
let stringAmplifier = "";
let amplifier;
function setup() {
    loadConfig();
    modeStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    amplifierStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    changeMode(SFVimMode.NORMAL);
}
exports.setup = setup;
function loadConfig() {
    config = vscode.workspace.getConfiguration("sfvim");
}
exports.loadConfig = loadConfig;
function changeMode(newMode) {
    mode = newMode;
    modeStatus.text = mode === SFVimMode.NORMAL ? "-- NORMAL --" : "-- INSERT --";
    modeStatus.show();
}
function updateAmplifier(num) {
    const timeDifference = Date.now() - lastKeyPress;
    stringAmplifier = timeDifference > 500 ? num : stringAmplifier + num;
    amplifier = parseInt(stringAmplifier);
    amplifierStatus.text = stringAmplifier;
    amplifierStatus.show();
}
function handleKeys(event) {
    const editor = vscode.window.activeTextEditor;
    if (event === undefined || editor === undefined) {
        return;
    }
    const currentMode = mode;
    const key = event.text;
    const currentTime = Date.now();
    if (key === undefined) {
        if (currentMode === SFVimMode.NORMAL) {
            event.preventDefault();
        }
        return;
    }
    if (currentMode === SFVimMode.NORMAL && /^\d+$/.exec(key)?.length) {
        updateAmplifier(key);
        lastKey = key;
        lastKeyPress = currentTime;
        event.preventDefault();
        return;
    }
    const binds = currentMode === SFVimMode.NORMAL ? config["normalModeKeybindings"] : config["insertModeKeybindings"];
    if (binds === undefined) {
        if (mode === SFVimMode.NORMAL) {
            event.preventDefault();
        }
        return;
    }
    const called = binds.filter(bind => bind.bind === key || typeof bind.delay === "number" && currentTime - bind.delay <= lastKeyPress && bind.bind === `${lastKey}${key}`).map(bind => bind.command);
    const trigger = commands.filter(command => called.includes(command.name));
    for (const command of trigger) {
        command.handler(editor, amplifier);
    }
    amplifier = trigger.length > 0 ? 0 : amplifier;
    if (amplifier == 0) {
        amplifierStatus.hide();
    }
    lastKey = key;
    lastKeyPress = currentTime;
    if (currentMode === SFVimMode.NORMAL) {
        event.preventDefault();
    }
}
exports.handleKeys = handleKeys;
//# sourceMappingURL=key.handler.js.map