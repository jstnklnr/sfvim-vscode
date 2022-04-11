import * as vscode from "vscode";
import { executeMotionDown } from "../commands/motionDown.command";
import { executeMotionUp } from "../commands/motionUp.command";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { executeMotionLeft } from "../commands/motionLeft.command";
import { executeMotionRight } from "../commands/motionRight.command";
import { executeMotionSkipLeft } from "../commands/motionSkipLeft.command";
import { executeMotionSkipRight } from "../commands/motionSkipRight.command";
import { executeMotionTop } from "../commands/motionTop.command";
import { executeMotionBottom } from "../commands/motionBottom.command";
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
import { executeCut } from "../commands/cut.command";
import { executePasteBefore } from "../commands/pasteBefore.command";
import { executePasteBehind } from "../commands/pasteBehind.command";
import { executePasteBeforeMoveBehind } from "../commands/pasteBeforeMoveBehind.command";
import { executePasteBehindMoveBehind } from "../commands/pasteBehindMoveBehind.command";
import { executePasteReplace } from "../commands/pasteReplace.command";
import { executePasteReplaceMoveBehind } from "../commands/pasteReplaceMoveBehind.command";
import { executeDelete } from "../commands/delete.command";
import { executeDeleteLine } from "../commands/deleteLine.command";
import { executeCutLine } from "../commands/cutLine.command";
import { executeCopyLine } from "../commands/copyLine.command";
import { executeDeleteUntilNext } from "../commands/deleteUntilNext.command";
import { executeDeleteUntilPrevious } from "../commands/deleteUntilPrevious.command";
import { executeDeleteUntilPreviousSpecial } from "../commands/deleteUntilPreviousSpecial.command";
import { executeDeleteUntilNextSpecial } from "../commands/deleteUntilNextSpecial.command";
import { executeDeleteWord } from "../commands/deleteWord.command";
import { executeDeleteSpecialWord } from "../commands/deleteSpecialWord.command";
import { executeCutUntilNext } from "../commands/cutUntilNext.command";
import { executeCutUntilPrevious } from "../commands/cutUntilPrevious.command";
import { executeCutUntilNextSpecial } from "../commands/cutUntilNextSpecial.command";
import { executeCutUntilPreviousSpecial } from "../commands/cutUntilPreviousSpecial.command";
import { executeCutWord } from "../commands/cutWord.command";
import { executeCutSpecialWord } from "../commands/cutSpecialWord.command";
import { executeCopySpecialWord } from "../commands/copySpecialWord.command";
import { executeCopyWord } from "../commands/copyWord.command";
import { executeCopyUntilPreviousSpecial } from "../commands/copyUntilPreviousSpecial.command";
import { executeCopyUntilPrevious } from "../commands/copyUntilPrevious.command";
import { executeCopyUntilNextSpecial } from "../commands/copyUntilNextSpecial.command";
import { executeCopyUntilNext } from "../commands/copyUntilnext.command";
import { executeSelectUntilNext } from "../commands/selectUntilNext.command";
import { executeSelectUntilNextSpecial } from "../commands/selectUntilNextSpecial.command";
import { executeSelectUntilPrevious } from "../commands/selectUntilPrevious.command";
import { executeSelectUntilPreviousSpecial } from "../commands/selectUntilPreviousSpecial.command";
import { executeSelectWord } from "../commands/selectWord.command";
import { executeSelectSpecialWord } from "../commands/selectSpecialWord.command";
import { executeSelectionSwap } from "../commands/selectionSwap.command";
import { executeUndo } from "../commands/undo.command";
import { executeRedo } from "../commands/redo.command";
import { executeSuggestion } from "../commands/suggestion.command";
import { executeDeleteCharacter } from "../commands/deleteCharacter.command";
import { executeDeleteCharacterMoveleft } from "../commands/deleteCharacterMoveLeft.command";
import { executeReplaceInsert } from "../commands/replaceInsert.command";
import { executeAddLineAbove } from "../commands/addLineAbove.command";
import { executeAddLineBelow } from "../commands/addLineBelow.command";
import { executeAddTab } from "../commands/addTab.command";
import { executeRemoveTab } from "../commands/removeTab.command";

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
        name: "copy.line",
        mode: SFVimMode.NORMAL,
        description: "Copies the current line",
        handler: executeCopyLine
    },
    {
        name: "copy.untilNextWord",
        mode: SFVimMode.NORMAL,
        description: "Copies all characters from the current to the next occurring word",
        handler: executeCopyUntilNext
    },
    {
        name: "copy.untilNextSpecialWord",
        mode: SFVimMode.NORMAL,
        description: "Copies all characters from the current to the next occurring word (including special characters)",
        handler: executeCopyUntilNextSpecial
    },
    {
        name: "copy.untilPreviousWord",
        mode: SFVimMode.NORMAL,
        description: "Copies all characters from the current to the previous occurring word",
        handler: executeCopyUntilPrevious
    },
    {
        name: "copy.untilPreviousSpecialWord",
        mode: SFVimMode.NORMAL,
        description: "Copies all characters from the current to the previous occurring word (including special characters)",
        handler: executeCopyUntilPreviousSpecial
    },
    {
        name: "copy.word",
        mode: SFVimMode.NORMAL,
        description: "Copies all characters of the current word",
        handler: executeCopyWord
    },
    {
        name: "copy.specialWord",
        mode: SFVimMode.NORMAL,
        description: "Copies all characters of the current word (including special characters)",
        handler: executeCopySpecialWord
    },
    {
        name: "cut",
        mode: SFVimMode.VISUAL,
        description: "Cuts the highligted text",
        handler: executeCut
    },
    {
        name: "cut.line",
        mode: SFVimMode.NORMAL,
        description: "Cuts the current line",
        handler: executeCutLine
    },
    {
        name: "cut.untilNextWord",
        mode: SFVimMode.NORMAL,
        description: "Cuts all characters from the current to the next occurring word",
        handler: executeCutUntilNext
    },
    {
        name: "cut.untilNextSpecialWord",
        mode: SFVimMode.NORMAL,
        description: "Cuts all characters from the current to the next occurring word (including special characters)",
        handler: executeCutUntilNextSpecial
    },
    {
        name: "cut.untilPreviousWord",
        mode: SFVimMode.NORMAL,
        description: "Cuts all characters from the current to the previous occurring word",
        handler: executeCutUntilPrevious
    },
    {
        name: "cut.untilPreviousSpecialWord",
        mode: SFVimMode.NORMAL,
        description: "Cuts all characters from the current to the previous occurring word (including special characters)",
        handler: executeCutUntilPreviousSpecial
    },
    {
        name: "cut.word",
        mode: SFVimMode.NORMAL,
        description: "Cuts all characters of the current word",
        handler: executeCutWord
    },
    {
        name: "cut.specialWord",
        mode: SFVimMode.NORMAL,
        description: "Cuts all characters of the current word (including special characters)",
        handler: executeCutSpecialWord
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
        description: "Paste the content of the clipboard in front of the cursor, and move behind the pasted text",
        handler: executePasteBeforeMoveBehind
    },
    {
        name: "paste.behindMoveBehind",
        mode: SFVimMode.NORMAL,
        description: "Paste the content of the clipboard behind the cursor, and move behind the pasted text",
        handler: executePasteBehindMoveBehind
    },
    {
        name: "paste.replace",
        mode: SFVimMode.VISUAL,
        description: "Replace the currently selected text with the contents of the clipboard",
        handler: executePasteReplace
    },
    {
        name: "paste.replaceMoveBehind",
        mode: SFVimMode.VISUAL,
        description: "Replace the currently selected text with the contents of the clipboard, and move behind the pasted text",
        handler: executePasteReplaceMoveBehind
    },
    {
        name: "delete",
        mode: SFVimMode.VISUAL,
        description: "Deletes the currently selected text",
        handler: executeDelete
    },
    {
        name: "delete.line",
        mode: SFVimMode.NORMAL,
        description: "Deletes the current line",
        handler: executeDeleteLine
    },
    {
        name: "delete.untilNextWord",
        mode: SFVimMode.NORMAL,
        description: "Deletes all characters from the current to the next occuring word",
        handler: executeDeleteUntilNext
    },
    {
        name: "delete.untilNextSpecialWord",
        mode: SFVimMode.NORMAL,
        description: "Deletes all characters from the current to the next occuring word",
        handler: executeDeleteUntilNextSpecial
    },
    {
        name: "delete.untilPreviousWord",
        mode: SFVimMode.NORMAL,
        description: "Deletes all characters from the current to the previous occuring word (including special characters)",
        handler: executeDeleteUntilPrevious
    },
    {
        name: "delete.untilPreviousSpecialWord",
        mode: SFVimMode.NORMAL,
        description: "Deletes all characters from the current to the previous occuring word (including special characters)",
        handler: executeDeleteUntilPreviousSpecial
    },
    {
        name: "delete.word",
        mode: SFVimMode.NORMAL,
        description: "Deletes the word that is currently under the cursor",
        handler: executeDeleteWord
    },
    {
        name: "delete.character",
        mode: SFVimMode.NORMAL,
        description: "Deletes the characters that is currently under the cursor",
        handler: executeDeleteCharacter
    },
    {
        name: "delete.characterMoveLeft",
        mode: SFVimMode.NORMAL,
        description: "Deletes the characters that is currently under the cursor and moves one character to the left",
        handler: executeDeleteCharacterMoveleft
    },
    {
        name: "delete.specialWord",
        mode: SFVimMode.NORMAL,
        description: "Deletes the word that is currently under the cursor (including special characters)",
        handler: executeDeleteSpecialWord
    },
    {
        name: "replace.insert",
        mode: SFVimMode.VISUAL,
        description: "Deletes all selected characters and switches to insert mode",
        handler: executeReplaceInsert
    },
    {
        name: "add.lineBelow",
        mode: SFVimMode.NORMAL,
        description: "Adds a line below the current line",
        handler: executeAddLineBelow
    },
    {
        name: "add.lineAbove",
        mode: SFVimMode.NORMAL,
        description: "Adds a line above the current line",
        handler: executeAddLineAbove
    },
    {
        name: "add.tab",
        mode: SFVimMode.NORMAL,
        description: "Adds a tab at the start of the line",
        handler: executeAddTab
    },
    {
        name: "remove.tab",
        mode: SFVimMode.NORMAL,
        description: "Removes a tab at the start of the line",
        handler: executeRemoveTab
    },
    {
        name: "select.untilNextWord",
        mode: SFVimMode.NORMAL,
        description: "Selects all characters from the current to the next occuring word",
        handler: executeSelectUntilNext
    },
    {
        name: "select.untilNextSpecialWord",
        mode: SFVimMode.NORMAL,
        description: "Selects all characters from the current to the next occuring word (including special characters)",
        handler: executeSelectUntilNextSpecial
    },
    {
        name: "select.untilPreviousWord",
        mode: SFVimMode.NORMAL,
        description: "Selects all characters from the current to the previous occuring word",
        handler: executeSelectUntilPrevious
    },
    {
        name: "select.untilPreviousSpecialWord",
        mode: SFVimMode.NORMAL,
        description: "Selects all characters from the current to the previous occuring word (including special characters)",
        handler: executeSelectUntilPreviousSpecial
    },
    {
        name: "select.word",
        mode: SFVimMode.NORMAL,
        description: "Selects the word that is currently under the cursor",
        handler: executeSelectWord
    },
    {
        name: "select.specialWord",
        mode: SFVimMode.NORMAL,
        description: "Selects the word that is currently under the cursor (including special characters)",
        handler: executeSelectSpecialWord
    },
    {
        name: "selection.swap",
        mode: SFVimMode.VISUAL,
        description: "Swaps the anchor position with the active position",
        handler: executeSelectionSwap
    },
    {
        name: "undo",
        mode: SFVimMode.NORMAL,
        description: "Undoes the last action",
        handler: executeUndo
    },
    {
        name: "redo",
        mode: SFVimMode.NORMAL,
        description: "Redoes the last undone action",
        handler: executeRedo
    },
    {
        name: "suggestion",
        mode: SFVimMode.NORMAL,
        description: "Shows a list of suggested actions",
        handler: executeSuggestion
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