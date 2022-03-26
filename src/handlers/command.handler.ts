import { executeMotionDown } from "../commands/motionDown.command";
import { executeMotionUp } from "../commands/motionUp.command";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { executeMotionLeft } from "../commands/motionLeft.command";
import { executeMotionRight } from "../commands/motionRight.command";
import { executeMotionSkipLeft } from "../commands/motionSkipLeft.command";
import { executeMotionSkipRight } from "../commands/motionSkipRight.command";
import { executeMotionTop } from "../commands/motionTop.command";
import { executeMotionBottom } from "../commands/motionBottom.command";
import * as vscode from "vscode";
import { executeModeChangeNormal } from "../commands/modeNormal.command";
import { executeModeChangeInsert } from "../commands/modeInsert.command";
import { executeModeChangeVisual } from "../commands/modeVisual.command";
import { executeMotionSkipEndRight } from "../commands/motionSkipEndRight.command";
import { executeMotionJump } from "../commands/motionJump.command";
import { executeModeChangeInsertAppend } from "../commands/modeInsertAppend.command";
import { executeMotionLineStart } from "../commands/motionLineStart.command";
import { executeMotionLineEnd } from "../commands/motionLineEnd.command";
import { executeMotionSkipEndRightSpecial } from "../commands/motionSkipEndRightSpecial.command";
import { executeMotionSkipRightSpecial } from "../commands/motionSkipRightSpecial.command";
import { executeMotionSkipLeftSpecial } from "../commands/motionSkipLeftSpecial.command";
import { executeMotionNextEmptyLine } from "../commands/motionNextEmptyLine.command";
import { executeMotionPreviousEmptyLine } from "../commands/motionPreviousEmptyLine.command";
import { executeMotionRealLineStart } from "../commands/motionRealLineStart.command";
import { executeMotionRealLineEnd } from "../commands/motionRealLineEnd.command";
import { executeModeChangeInsertLineStart } from "../commands/modeInsertLineStart.command";
import { executeModeChangeInsertAppendLineEnd } from "../commands/modeInsertAppendLineEnd.command";
import { executeMotionSkipEndLeftSpecial } from "../commands/motionSkipEndLeftSpecial.command";
import { executeMotionSkipEndLeft } from "../commands/motionSkipEndLeft.command";
import { executeMotionHighestView } from "../commands/motionHighestView.command";
import { executeMotionLowestView } from "../commands/motionLowestView.command";
import { executeMotionMiddleView } from "../commands/motionMiddleView.command";
import { executeMotionScrollHalfPageDown } from "../commands/motionScrollHalfPageDown.command";
import { executeMotionScrollHalfPageUp } from "../commands/motionScrollHalfPageUp.command";
import { executeCopy } from "../commands/copy.command";
import { executeCopyMoveLast } from "../commands/copyMoveLast.command";
import { executeCopyMoveFirst } from "../commands/copyMoveFirst.command";
import { executeCutMoveBefore } from "../commands/cutMoveBefore.command";
import { executeCutMoveBehind } from "../commands/cutMoveBehind.command";
import { executePasteBefore } from "../commands/pasteBefore.command";
import { executePasteBehind } from "../commands/pasteBehind.command";
import { executePasteBeforeMoveBehind } from "../commands/pasteBeforeMoveBehind.command";
import { executePasteBehindMoveBehind } from "../commands/pasteBehindMoveBehind.command";

interface SFVimCommand {
    name: string;
    mode: number;
    description: string;
    handler: (editor: SFVimEditor, amplifier: number) => void;
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
        handler: executeModeChangeNormal
    },
    {
        name: "mode.insert",
        mode: SFVimMode.NORMAL,
        description: "Switches the current editor to INSERT mode and puts the cursor in front of the currently selected character",
        handler: executeModeChangeInsert
    },
    {
        name: "mode.append",
        mode: SFVimMode.NORMAL,
        description: "Switches the current editor to INSERT mode and puts the cursor behind the currently selected character",
        handler: executeModeChangeInsertAppend
    },
    {
        name: "mode.insertLineStart",
        mode: SFVimMode.NORMAL,
        description: "Switches the current editor to INSERT mode and puts the cursor in front of the first character of the line",
        handler: executeModeChangeInsertLineStart
    },
    {
        name: "mode.appendLineEnd",
        mode: SFVimMode.NORMAL,
        description: "Switches the current editor to INSERT mode and puts the cursor at the end of the line",
        handler: executeModeChangeInsertAppendLineEnd
    },
    {
        name: "mode.visual",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Toggles between visual and normal mode",
        handler: executeModeChangeVisual
    },
    {
        name: "motion.up",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the line above",
        handler: executeMotionUp
    },
    {
        name: "motion.down",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the line below",
        handler: executeMotionDown
    },
    {
        name: "motion.jump",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Jumps to the beginning of specified line",
        handler: executeMotionJump
    },
    {
        name: "motion.left",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the character to the left",
        handler: executeMotionLeft
    },
    {
        name: "motion.right",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the character to the right",
        handler: executeMotionRight
    },
    {
        name: "motion.skipLeft",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the beginning of the previous word",
        handler: executeMotionSkipLeft
    },
    {
        name: "motion.skipRight",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the beginning of the next word",
        handler: executeMotionSkipRight
    },
    {
        name: "motion.skipEndLeft",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the previous word",
        handler: executeMotionSkipEndLeft
    },
    {
        name: "motion.skipEndRight",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the next word",
        handler: executeMotionSkipEndRight
    },
    {
        name: "motion.skipLeftSpecial",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the beginning of the previous word (including special characters)",
        handler: executeMotionSkipLeftSpecial
    },
    {
        name: "motion.skipRightSpecial",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the beginning of the next word (including special characters)",
        handler: executeMotionSkipRightSpecial
    },
    {
        name: "motion.skipEndLeftSpecial",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the previous word (including special characters)",
        handler: executeMotionSkipEndLeftSpecial
    },
    {
        name: "motion.skipEndRightSpecial",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the next word (including special characters)",
        handler: executeMotionSkipEndRightSpecial
    },
    {
        name: "motion.top",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the top of the document",
        handler: executeMotionTop
    },
    {
        name: "motion.bottom",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the bottom of the document",
        handler: executeMotionBottom
    },
    {
        name: "motion.lineStart",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the first character of the line",
        handler: executeMotionLineStart
    },
    {
        name: "motion.lineEnd",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the last character of the line",
        handler: executeMotionLineEnd
    },
    {
        name: "motion.realLineStart",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the start of the line",
        handler: executeMotionRealLineStart
    },
    {
        name: "motion.realLineEnd",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the end of the line",
        handler: executeMotionRealLineEnd
    },
    {
        name: "motion.previousEmptyLine",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the previous empty line",
        handler: executeMotionPreviousEmptyLine
    },
    {
        name: "motion.nextEmptyLine",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the next empty line",
        handler: executeMotionNextEmptyLine
    },
    {
        name: "motion.highestView",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the highest line of the current viewport",
        handler: executeMotionHighestView
    },
    {
        name: "motion.lowestView",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the lowest line of the current viewport",
        handler: executeMotionLowestView
    },
    {
        name: "motion.middleView",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor to the middle line of the current viewport",
        handler: executeMotionMiddleView
    },
    {
        name: "motion.scrollHalfPageUp",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor half a page up and will set the scroll view to the cursor",
        handler: executeMotionScrollHalfPageUp
    },
    {
        name: "motion.scrollHalfPageDown",
        mode: SFVimMode.NORMAL | SFVimMode.VISUAL,
        description: "Moves the cursor half a page down and will set the scroll view to the cursor",
        handler: executeMotionScrollHalfPageDown
    },
    {
        name: "copy",
        mode: SFVimMode.VISUAL,
        description: "Copies the highlighted text",
        handler: executeCopy
    },
    {
        name: "copy.moveFirst",
        mode: SFVimMode.VISUAL,
        description: "Copies the highlighted text and jumps to first selected character",
        handler: executeCopyMoveFirst
    },
    {
        name: "copy.moveLast",
        mode: SFVimMode.VISUAL,
        description: "Copies the highlighted text and jumps to the last selected character",
        handler: executeCopyMoveLast
    },
    {
        name: "cut.moveBefore",
        mode: SFVimMode.VISUAL,
        description: "Copies the highlighted text and jumps to the character in front of the cut text",
        handler: executeCutMoveBefore
    },
    {
        name: "cut.moveBehind",
        mode: SFVimMode.VISUAL,
        description: "Copies the highlighted text and jumps to the character behind the cut text",
        handler: executeCutMoveBehind
    },
    {
        name: "paste.before",
        mode: SFVimMode.NORMAL,
        description: "Paste the content of the clipboard in front of the cursor",
        handler: executePasteBefore
    },
    {
        name: "paste.behind",
        mode: SFVimMode.NORMAL,
        description: "Paste the content of the clipboard behind the cursor",
        handler: executePasteBehind
    },
    {
        name: "paste.beforeMoveBehind",
        mode: SFVimMode.NORMAL,
        description: "Paste the content of the clipboard in front of the cursor, but move behind the pasted text",
        handler: executePasteBeforeMoveBehind
    },
    {
        name: "paste.behindMoveBehind",
        mode: SFVimMode.NORMAL,
        description: "Paste the content of the clipboard behind the cursor, but move behind the pasted text",
        handler: executePasteBehindMoveBehind
    }
];

export class CommandHandler {
    config: any;
    lastKeyPress: number;
    lastKeys: string;

    constructor(config: any) {
        this.config = config;
        this.lastKeyPress = 0;
        this.lastKeys = "";
    }

    updateAmplifier(editor: SFVimEditor, key: string) {
        const timeDifference = Date.now() - this.lastKeyPress;
        editor.stringAmplifier = timeDifference > 500 ? key : editor.stringAmplifier + key;
        editor.amplifier = parseInt(editor.stringAmplifier);
        editor.callStatusCallback();
    }

    handleKeys(vimEditor: SFVimEditor, event: any) {
        const currentTime = Date.now();
    
        if(currentTime - 500 > this.lastKeyPress) {
            this.lastKeys = "";
        }
        
        if(event === undefined) {
            return;
        }
        
        const currentMode = vimEditor.mode;
        const key: string = event.text;
    
        if(key === undefined || key === "\n") {
            if(currentMode & (SFVimMode.NORMAL | SFVimMode.VISUAL)) {
                event.preventDefault();
            }
    
            return;
        }
    
        if(currentMode & (SFVimMode.NORMAL | SFVimMode.VISUAL) && /^\d+$/.exec(key)?.length) {
            this.updateAmplifier(vimEditor, key);
            this.lastKeyPress = currentTime;
    
            event.preventDefault();
            return;
        }
    
        const binds: Array<SFVimBind> = currentMode & (SFVimMode.NORMAL | SFVimMode.VISUAL) ? this.config["normalModeKeybindings"] : this.config["insertModeKeybindings"];
    
        if(binds === undefined) {
            if(currentMode & (SFVimMode.NORMAL | SFVimMode.VISUAL)) {
                event.preventDefault();
            }
    
            return;
        }
    
        let pressedKeys = `${this.lastKeys}${key}`;
        let potential = binds.filter(bind => bind.bind.startsWith(pressedKeys));

        if(pressedKeys.length > 1 && potential.length == 0) {
            this.lastKeys = '';
            pressedKeys = key;
            potential = binds.filter(bind => bind.bind.startsWith(pressedKeys));
        }
    
        const called = potential.filter(bind => 
            currentTime - 500 <= this.lastKeyPress && bind.bind === pressedKeys || bind.bind === key
        );
    
        const calledCommands = called.map(bind => bind.command);
        const trigger = commands.filter(command => calledCommands.includes(command.name) && command.mode & currentMode);
    
        if(currentMode === SFVimMode.INSERT && trigger.length > 0) {
            const line = vimEditor.editor.selection.active.line;
            const character = vimEditor.editor.selection.active.character;
    
            vimEditor.editor.edit(editBuilder => {
                editBuilder.delete(new vscode.Range(line, character - (pressedKeys.length - 1), line, character));
            });

            const newPosition = new vscode.Position(line, Math.max(character - (pressedKeys.length - 1)));
            vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
        }
    
        for(const command of trigger) {
            command.handler(vimEditor, vimEditor.amplifier);
        }
        
        vimEditor.amplifier = trigger.length > 0 ? 0 : vimEditor.amplifier;
        
        if(vimEditor.amplifier == 0) {
            vimEditor.stringAmplifier = "";
            vimEditor.callStatusCallback();
        }
        
        if(potential.length > 0) {
            this.lastKeys += key;
            this.lastKeyPress = currentTime;
        }
        
        if(trigger.length > 0) {
            if(potential.length <= trigger.length) {
                this.lastKeys = "";
            }

            event.preventDefault();
        }
    
        if(currentMode & (SFVimMode.NORMAL | SFVimMode.VISUAL)) {
            event.preventDefault();
        }
    }
}