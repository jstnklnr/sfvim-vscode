"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const motionDown_command_1 = require("../commands/motionDown.command");
const motionUp_command_1 = require("../commands/motionUp.command");
const SFVimEditor_1 = require("../types/SFVimEditor");
const motionLeft_command_1 = require("../commands/motionLeft.command");
const motionRight_command_1 = require("../commands/motionRight.command");
const motionSkipLeft_command_1 = require("../commands/motionSkipLeft.command");
const motionSkipRight_command_1 = require("../commands/motionSkipRight.command");
const motionTop_command_1 = require("../commands/motionTop.command");
const motionBottom_command_1 = require("../commands/motionBottom.command");
const vscode = require("vscode");
const modeNormal_command_1 = require("../commands/modeNormal.command");
const modeInsert_command_1 = require("../commands/modeInsert.command");
const modeVisual_command_1 = require("../commands/modeVisual.command");
const motionSkipEndRight_command_1 = require("../commands/motionSkipEndRight.command");
const jump_command_1 = require("../commands/jump.command");
const modeInsertAppend_command_1 = require("../commands/modeInsertAppend.command");
const motionLineStart_command_1 = require("../commands/motionLineStart.command");
const motionLineEnd_command_1 = require("../commands/motionLineEnd.command");
const commands = [
    {
        name: "mode.normal",
        mode: SFVimEditor_1.SFVimMode.INSERT,
        description: "Switches the current editor mode to NORMAL",
        handler: modeNormal_command_1.executeModeChangeNormal
    },
    {
        name: "mode.insert",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Switches the current editor to INSERT mode and puts the cursor in front of the currently selected character",
        handler: modeInsert_command_1.executeModeChangeInsert
    },
    {
        name: "mode.append",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Switches the current editor to INSERT mode and puts the cursor behind the currently selected character",
        handler: modeInsertAppend_command_1.executeModeChangeInsertAppend
    },
    {
        name: "mode.visual",
        mode: SFVimEditor_1.SFVimMode.NORMAL & SFVimEditor_1.SFVimMode.VISUAL,
        description: "Toggles between visual and normal mode",
        handler: modeVisual_command_1.executeModeChangeVisual
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
    },
    {
        name: "motion.jump",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Jumps to the beginning of specified line",
        handler: jump_command_1.executeMotionJump
    },
    {
        name: "motion.left",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the character to the left",
        handler: motionLeft_command_1.executeMotionLeft
    },
    {
        name: "motion.right",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the character to the right",
        handler: motionRight_command_1.executeMotionRight
    },
    {
        name: "motion.skipLeft",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the beginning of the previous word",
        handler: motionSkipLeft_command_1.executeMotionSkipLeft
    },
    {
        name: "motion.skipRight",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the beginning of the next word",
        handler: motionSkipRight_command_1.executeMotionSkipRight
    },
    {
        name: "motion.skipEndRight",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the end of the next word",
        handler: motionSkipEndRight_command_1.executeMotionSkipEndRight
    },
    {
        name: "motion.top",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the top of the document",
        handler: motionTop_command_1.executeMotionTop
    },
    {
        name: "motion.bottom",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the bottom of the document",
        handler: motionBottom_command_1.executeMotionBottom
    },
    {
        name: "motion.lineStart",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the start of the line",
        handler: motionLineStart_command_1.executeMotionLineStart
    },
    {
        name: "motion.lineEnd",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Moves the cursor to the end of the line",
        handler: motionLineEnd_command_1.executeMotionLineEnd
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
            if (currentMode & SFVimEditor_1.SFVimMode.NORMAL) {
                event.preventDefault();
            }
            return;
        }
        if (currentMode & SFVimEditor_1.SFVimMode.NORMAL && /^\d+$/.exec(key)?.length) {
            this.updateAmplifier(vimEditor, key);
            this.lastKeyPress = currentTime;
            event.preventDefault();
            return;
        }
        const binds = currentMode & SFVimEditor_1.SFVimMode.NORMAL ? this.config["normalModeKeybindings"] : this.config["insertModeKeybindings"];
        if (binds === undefined) {
            if (currentMode & SFVimEditor_1.SFVimMode.NORMAL) {
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
            const newPosition = new vscode.Position(line, Math.max(character - (pressedKeys.length - 1)));
            vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
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
        if (currentMode & SFVimEditor_1.SFVimMode.NORMAL) {
            event.preventDefault();
        }
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=command.handler.js.map