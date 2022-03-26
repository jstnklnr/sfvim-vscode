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
const motionJump_command_1 = require("../commands/motionJump.command");
const modeInsertAppend_command_1 = require("../commands/modeInsertAppend.command");
const motionLineStart_command_1 = require("../commands/motionLineStart.command");
const motionLineEnd_command_1 = require("../commands/motionLineEnd.command");
const motionSkipEndRightSpecial_command_1 = require("../commands/motionSkipEndRightSpecial.command");
const motionSkipRightSpecial_command_1 = require("../commands/motionSkipRightSpecial.command");
const motionSkipLeftSpecial_command_1 = require("../commands/motionSkipLeftSpecial.command");
const motionNextEmptyLine_command_1 = require("../commands/motionNextEmptyLine.command");
const motionPreviousEmptyLine_command_1 = require("../commands/motionPreviousEmptyLine.command");
const motionRealLineStart_command_1 = require("../commands/motionRealLineStart.command");
const motionRealLineEnd_command_1 = require("../commands/motionRealLineEnd.command");
const modeInsertLineStart_command_1 = require("../commands/modeInsertLineStart.command");
const modeInsertAppendLineEnd_command_1 = require("../commands/modeInsertAppendLineEnd.command");
const motionSkipEndLeftSpecial_command_1 = require("../commands/motionSkipEndLeftSpecial.command");
const motionSkipEndLeft_command_1 = require("../commands/motionSkipEndLeft.command");
const motionHighestView_command_1 = require("../commands/motionHighestView.command");
const motionLowestView_command_1 = require("../commands/motionLowestView.command");
const motionMiddleView_command_1 = require("../commands/motionMiddleView.command");
const motionScrollHalfPageDown_command_1 = require("../commands/motionScrollHalfPageDown.command");
const motionScrollHalfPageUp_command_1 = require("../commands/motionScrollHalfPageUp.command");
const copy_command_1 = require("../commands/copy.command");
const copyMoveLast_command_1 = require("../commands/copyMoveLast.command");
const copyMoveFirst_command_1 = require("../commands/copyMoveFirst.command");
const cutMoveBefore_command_1 = require("../commands/cutMoveBefore.command");
const cutMoveBehind_command_1 = require("../commands/cutMoveBehind.command");
const pasteBefore_command_1 = require("../commands/pasteBefore.command");
const pasteBehind_command_1 = require("../commands/pasteBehind.command");
const pasteBeforeMoveBehind_command_1 = require("../commands/pasteBeforeMoveBehind.command");
const pasteBehindMoveBehind_command_1 = require("../commands/pasteBehindMoveBehind.command");
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
        name: "mode.insertLineStart",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Switches the current editor to INSERT mode and puts the cursor in front of the first character of the line",
        handler: modeInsertLineStart_command_1.executeModeChangeInsertLineStart
    },
    {
        name: "mode.appendLineEnd",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Switches the current editor to INSERT mode and puts the cursor at the end of the line",
        handler: modeInsertAppendLineEnd_command_1.executeModeChangeInsertAppendLineEnd
    },
    {
        name: "mode.visual",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Toggles between visual and normal mode",
        handler: modeVisual_command_1.executeModeChangeVisual
    },
    {
        name: "motion.up",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the line above",
        handler: motionUp_command_1.executeMotionUp
    },
    {
        name: "motion.down",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the line below",
        handler: motionDown_command_1.executeMotionDown
    },
    {
        name: "motion.jump",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Jumps to the beginning of specified line",
        handler: motionJump_command_1.executeMotionJump
    },
    {
        name: "motion.left",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the character to the left",
        handler: motionLeft_command_1.executeMotionLeft
    },
    {
        name: "motion.right",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the character to the right",
        handler: motionRight_command_1.executeMotionRight
    },
    {
        name: "motion.skipLeft",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the beginning of the previous word",
        handler: motionSkipLeft_command_1.executeMotionSkipLeft
    },
    {
        name: "motion.skipRight",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the beginning of the next word",
        handler: motionSkipRight_command_1.executeMotionSkipRight
    },
    {
        name: "motion.skipEndLeft",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the previous word",
        handler: motionSkipEndLeft_command_1.executeMotionSkipEndLeft
    },
    {
        name: "motion.skipEndRight",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the next word",
        handler: motionSkipEndRight_command_1.executeMotionSkipEndRight
    },
    {
        name: "motion.skipLeftSpecial",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the beginning of the previous word (including special characters)",
        handler: motionSkipLeftSpecial_command_1.executeMotionSkipLeftSpecial
    },
    {
        name: "motion.skipRightSpecial",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the beginning of the next word (including special characters)",
        handler: motionSkipRightSpecial_command_1.executeMotionSkipRightSpecial
    },
    {
        name: "motion.skipEndLeftSpecial",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the previous word (including special characters)",
        handler: motionSkipEndLeftSpecial_command_1.executeMotionSkipEndLeftSpecial
    },
    {
        name: "motion.skipEndRightSpecial",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the next word (including special characters)",
        handler: motionSkipEndRightSpecial_command_1.executeMotionSkipEndRightSpecial
    },
    {
        name: "motion.top",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the top of the document",
        handler: motionTop_command_1.executeMotionTop
    },
    {
        name: "motion.bottom",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the bottom of the document",
        handler: motionBottom_command_1.executeMotionBottom
    },
    {
        name: "motion.lineStart",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the first character of the line",
        handler: motionLineStart_command_1.executeMotionLineStart
    },
    {
        name: "motion.lineEnd",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the last character of the line",
        handler: motionLineEnd_command_1.executeMotionLineEnd
    },
    {
        name: "motion.realLineStart",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the start of the line",
        handler: motionRealLineStart_command_1.executeMotionRealLineStart
    },
    {
        name: "motion.realLineEnd",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the line",
        handler: motionRealLineEnd_command_1.executeMotionRealLineEnd
    },
    {
        name: "motion.previousEmptyLine",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the previous empty line",
        handler: motionPreviousEmptyLine_command_1.executeMotionPreviousEmptyLine
    },
    {
        name: "motion.nextEmptyLine",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the next empty line",
        handler: motionNextEmptyLine_command_1.executeMotionNextEmptyLine
    },
    {
        name: "motion.highestView",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the highest line of the current viewport",
        handler: motionHighestView_command_1.executeMotionHighestView
    },
    {
        name: "motion.lowestView",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the lowest line of the current viewport",
        handler: motionLowestView_command_1.executeMotionLowestView
    },
    {
        name: "motion.middleView",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor to the middle line of the current viewport",
        handler: motionMiddleView_command_1.executeMotionMiddleView
    },
    {
        name: "motion.scrollHalfPageUp",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor half a page up and will set the scroll view to the cursor",
        handler: motionScrollHalfPageUp_command_1.executeMotionScrollHalfPageUp
    },
    {
        name: "motion.scrollHalfPageDown",
        mode: SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL,
        description: "Moves the cursor half a page down and will set the scroll view to the cursor",
        handler: motionScrollHalfPageDown_command_1.executeMotionScrollHalfPageDown
    },
    {
        name: "copy",
        mode: SFVimEditor_1.SFVimMode.VISUAL,
        description: "Copies the highlighted text",
        handler: copy_command_1.executeCopy
    },
    {
        name: "copy.moveFirst",
        mode: SFVimEditor_1.SFVimMode.VISUAL,
        description: "Copies the highlighted text and jumps to first selected character",
        handler: copyMoveFirst_command_1.executeCopyMoveFirst
    },
    {
        name: "copy.moveLast",
        mode: SFVimEditor_1.SFVimMode.VISUAL,
        description: "Copies the highlighted text and jumps to the last selected character",
        handler: copyMoveLast_command_1.executeCopyMoveLast
    },
    {
        name: "cut.moveBefore",
        mode: SFVimEditor_1.SFVimMode.VISUAL,
        description: "Copies the highlighted text and jumps to the character in front of the cut text",
        handler: cutMoveBefore_command_1.executeCutMoveBefore
    },
    {
        name: "cut.moveBehind",
        mode: SFVimEditor_1.SFVimMode.VISUAL,
        description: "Copies the highlighted text and jumps to the character behind the cut text",
        handler: cutMoveBehind_command_1.executeCutMoveBehind
    },
    {
        name: "paste.before",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Paste the content of the clipboard in front of the cursor",
        handler: pasteBefore_command_1.executePasteBefore
    },
    {
        name: "paste.behind",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Paste the content of the clipboard behind the cursor",
        handler: pasteBehind_command_1.executePasteBehind
    },
    {
        name: "paste.beforeMoveBehind",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Paste the content of the clipboard in front of the cursor, but move behind the pasted text",
        handler: pasteBeforeMoveBehind_command_1.executePasteBeforeMoveBehind
    },
    {
        name: "paste.behindMoveBehind",
        mode: SFVimEditor_1.SFVimMode.NORMAL,
        description: "Paste the content of the clipboard behind the cursor, but move behind the pasted text",
        handler: pasteBehindMoveBehind_command_1.executePasteBehindMoveBehind
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
            if (currentMode & (SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL)) {
                event.preventDefault();
            }
            return;
        }
        if (currentMode & (SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL) && /^\d+$/.exec(key)?.length) {
            this.updateAmplifier(vimEditor, key);
            this.lastKeyPress = currentTime;
            event.preventDefault();
            return;
        }
        const binds = currentMode & (SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL) ? this.config["normalModeKeybindings"] : this.config["insertModeKeybindings"];
        if (binds === undefined) {
            if (currentMode & (SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL)) {
                event.preventDefault();
            }
            return;
        }
        let pressedKeys = `${this.lastKeys}${key}`;
        let potential = binds.filter(bind => bind.bind.startsWith(pressedKeys));
        if (pressedKeys.length > 1 && potential.length == 0) {
            this.lastKeys = '';
            pressedKeys = key;
            potential = binds.filter(bind => bind.bind.startsWith(pressedKeys));
        }
        const called = potential.filter(bind => currentTime - 500 <= this.lastKeyPress && bind.bind === pressedKeys || bind.bind === key);
        const calledCommands = called.map(bind => bind.command);
        const trigger = commands.filter(command => calledCommands.includes(command.name) && command.mode & currentMode);
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
            vimEditor.stringAmplifier = "";
            vimEditor.callStatusCallback();
        }
        if (potential.length > 0) {
            this.lastKeys += key;
            this.lastKeyPress = currentTime;
        }
        if (trigger.length > 0) {
            if (potential.length <= trigger.length) {
                this.lastKeys = "";
            }
            event.preventDefault();
        }
        if (currentMode & (SFVimEditor_1.SFVimMode.NORMAL | SFVimEditor_1.SFVimMode.VISUAL)) {
            event.preventDefault();
        }
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=command.handler.js.map