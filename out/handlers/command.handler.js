"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const motionDown_command_1 = require("../commands/motionDown.command");
const motionUp_command_1 = require("../commands/motionUp.command");
const SFVimEditor_1 = require("../types/SFVimEditor");
const vscode = require("vscode");
const commands = [
    {
        name: "mode.normal",
        mode: SFVimEditor_1.SFVimMode.INSERT,
        description: "Switches the current editor mode to NORMAL",
        handler: (editor) => editor.changeMode(SFVimEditor_1.SFVimMode.NORMAL)
    },
    {
        name: "mode.insert",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Switches the current editor mode to INSERT",
        handler: (editor) => editor.changeMode(SFVimEditor_1.SFVimMode.INSERT)
    },
    {
        name: "motion.up",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the line above",
        handler: motionUp_command_1.executeMotionUp
    },
    {
        name: "motion.down",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the line below",
        handler: motionDown_command_1.executeMotionDown
    }
];
class CommandHandler {
    constructor(config) {
        this.config = config;
        this.lastKeyPress = 0;
        this.lastKeys = "";
    }
    updateAmplifier(editor, key) {
        const timeDifference = Date.now() - this.lastKeyPress;
        editor.stringAmplifier = timeDifference > 500 ? key : editor.stringAmplifier + key;
        editor.amplifier = parseInt(editor.stringAmplifier);
        editor.callStatusCallback();
    }
    handleKeys(vimEditor, event) {
        const currentTime = Date.now();
        if (currentTime - 500 > this.lastKeyPress) {
            this.lastKeys = "";
        }
        if (event === undefined) {
            return;
        }
        const currentMode = vimEditor.mode;
        const key = event.text;
        if (key === undefined || key === "\n") {
            if (currentMode === SFVimEditor_1.SFVimMode.NORMAL) {
                event.preventDefault();
            }
            return;
        }
        if (currentMode === SFVimEditor_1.SFVimMode.NORMAL && /^\d+$/.exec(key)?.length) {
            this.updateAmplifier(vimEditor, key);
            this.lastKeyPress = currentTime;
            event.preventDefault();
            return;
        }
        const binds = currentMode === SFVimEditor_1.SFVimMode.NORMAL ? this.config["normalModeKeybindings"] : this.config["insertModeKeybindings"];
        if (binds === undefined) {
            if (currentMode === SFVimEditor_1.SFVimMode.NORMAL) {
                event.preventDefault();
            }
            return;
        }
        const pressedKeys = `${this.lastKeys}${key}`;
        const potential = binds.filter(bind => bind.bind.startsWith(pressedKeys));
        const called = potential.filter(bind => currentTime - 500 <= this.lastKeyPress && bind.bind === pressedKeys || bind.bind === key);
        const calledCommands = called.map(bind => bind.command);
        const trigger = commands.filter(command => calledCommands.includes(command.name));
        if (currentMode === SFVimEditor_1.SFVimMode.INSERT && trigger.length > 0) {
            const line = vimEditor.editor.selection.active.line;
            const character = vimEditor.editor.selection.active.character;
            vimEditor.editor.edit(editBuilder => {
                editBuilder.delete(new vscode.Range(line, character - (pressedKeys.length - 1), line, character));
            });
        }
        for (const command of trigger) {
            command.handler(vimEditor, vimEditor.amplifier);
        }
        vimEditor.amplifier = trigger.length > 0 ? 0 : vimEditor.amplifier;
        if (vimEditor.amplifier == 0) {
            vimEditor.callStatusCallback();
        }
        if (potential.length > 0) {
            this.lastKeys += key;
            this.lastKeyPress = currentTime;
        }
        if (trigger.length > 0) {
            this.lastKeys = "";
            event.preventDefault();
        }
        if (currentMode === SFVimEditor_1.SFVimMode.NORMAL) {
            event.preventDefault();
        }
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=command.handler.js.map