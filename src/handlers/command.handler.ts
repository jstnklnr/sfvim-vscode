import * as vscode from "vscode";
import { SFVimCommand } from "../types/SFVimCommand";
import { CommandModeInsertAppend } from "../commands/mode/modeInsertAppend.command";
import { CommandModeInsertAppendLineEnd } from "../commands/mode/modeInsertAppendLineEnd.command";
import { CommandModeInsertLineStart } from "../commands/mode/modeInsertLineStart.command";
import { CommandModeNormal } from "../commands/mode/modeNormal.command";
import { CommandModeVisual } from "../commands/mode/modeVisual.command";
import { CommandMotionDown } from "../commands/motion/motionDown.command";
import { CommandMotionHighestView } from "../commands/motion/motionHighestView.command";
import { CommandMotionJump } from "../commands/motion/motionJump.command";
import { CommandMotionLeft } from "../commands/motion/motionLeft.command";
import { CommandMotionLineEnd } from "../commands/motion/motionLineEnd.command";
import { CommandMotionLineStart } from "../commands/motion/motionLineStart.command";
import { CommandMotionLowestView } from "../commands/motion/motionLowestView.command";
import { CommandMotionMiddleView } from "../commands/motion/motionMiddleView.command";
import { CommandMotionNextEmptyLine } from "../commands/motion/motionNextEmptyLine.command";
import { CommandMotionPreviousEmptyLine } from "../commands/motion/motionPreviousEmptyLine.command";
import { CommandMotionRealLineEnd } from "../commands/motion/motionRealLineEnd.command";
import { CommandMotionRealLineStart } from "../commands/motion/motionRealLineStart.command";
import { CommandMotionRight } from "../commands/motion/motionRight.command";
import { CommandMotionScrollHalfPageDown } from "../commands/motion/motionScrollHalfPageDown.command";
import { CommandMotionScrollHalfPageUp } from "../commands/motion/motionScrollHalfPageUp.command";
import { CommandMotionSkipEndLeft } from "../commands/motion/motionSkipEndLeft.command";
import { CommandMotionSkipEndLeftSpecial } from "../commands/motion/motionSkipEndLeftSpecial.command";
import { CommandMotionSkipEndRight } from "../commands/motion/motionSkipEndRight.command";
import { CommandMotionSkipEndRightSpecial } from "../commands/motion/motionSkipEndRightSpecial.command";
import { CommandMotionSkipLeft } from "../commands/motion/motionSkipLeft.command";
import { CommandMotionSkipLeftSpecial } from "../commands/motion/motionSkipLeftSpecial.command";
import { CommandMotionSkipRight } from "../commands/motion/motionSkipRight.command";
import { CommandMotionSkipRightSpecial } from "../commands/motion/motionSkipRightSpecial.command";
import { CommandMotionTop } from "../commands/motion/motionTop.command";
import { CommandMotionUp } from "../commands/motion/motionUp.command";
import { CommandSelectSpecialWord } from "../commands/select/selectSpecialWord.command";
import { CommandSelectUntilNext } from "../commands/select/selectUntilNext.command";
import { CommandSelectUntilNextSpecial } from "../commands/select/selectUntilNextSpecial.command";
import { CommandSelectUntilPrevious } from "../commands/select/selectUntilPrevious.command";
import { CommandSelectUntilPreviousSpecial } from "../commands/select/selectUntilPreviousSpecial.command";
import { CommandSelectWord } from "../commands/select/selectWord.command";
import { CommandAddLineBelow } from "../commands/misc/addLineBelow.command";
import { CommandAddTab } from "../commands/misc/addTab.command";
import { CommandRedo } from "../commands/misc/redo.command";
import { CommandRemoveTab } from "../commands/misc/removeTab.command";
import { CommandReplaceInsert } from "../commands/misc/replaceInsert.command";
import { CommandShiftLineDown } from "../commands/misc/shiftLineDown.command";
import { CommandShiftLineUp } from "../commands/misc/shiftLineUp.command";
import { CommandSuggestion } from "../commands/misc/suggestion.command";
import { CommandUndo } from "../commands/misc/undo.command";
import { CommandCopyLine } from "../commands/copy/copyLine.command";
import { CommandCopyLineDown } from "../commands/copy/copyLineDown.command";
import { CommandCopyMoveFirst } from "../commands/copy/copyMoveFirst.command";
import { CommandCopyMoveLast } from "../commands/copy/copyMoveLast.command";
import { CommandCopySpecialWord } from "../commands/copy/copySpecialWord.command";
import { CommandCopyUntilNext } from "../commands/copy/copyUntilNext.command";
import { CommandCopyUntilNextSpecial } from "../commands/copy/copyUntilNextSpecial.command";
import { CommandCopyUntilPrevious } from "../commands/copy/copyUntilPrevious.command";
import { CommandCopyUntilPreviousSpecial } from "../commands/copy/copyUntilPreviousSpecial.command";
import { CommandCopyWord } from "../commands/copy/copyWord.command";
import { CommandCutLine } from "../commands/cut/cutLine.command";
import { CommandCutSpecialWord } from "../commands/cut/cutSpecialWord.command";
import { CommandCutUntilNext } from "../commands/cut/cutUntilNext.command";
import { CommandCutUntilNextSpecial } from "../commands/cut/cutUntilNextSpecial.command";
import { CommandCutUntilPrevious } from "../commands/cut/cutUntilPrevious.command";
import { CommandCutUntilPreviousSpecial } from "../commands/cut/cutUntilPreviousSpecial.command";
import { CommandCutWord } from "../commands/cut/cutWord.command";
import { CommandPasteBeforeMoveBehind } from "../commands/paste/pasteBeforeMoveBehind.command";
import { CommandPasteBehind } from "../commands/paste/pasteBehind.command";
import { CommandPasteBehindMoveBehind } from "../commands/paste/pasteBehindMoveBehind.command";
import { CommandPasteReplace } from "../commands/paste/pasteReplace.command";
import { CommandPasteReplaceMoveBehind } from "../commands/paste/pasteReplaceMoveBehind.command";
import { CommandDeleteCharacter } from "../commands/delete/deleteCharacter.command";
import { CommandDeleteCharacterMoveLeft } from "../commands/delete/deleteCharacterMoveLeft.command";
import { CommandDeleteLine } from "../commands/delete/deleteLine.command";
import { CommandDeleteRightCharacter } from "../commands/delete/deleteRightCharacter.command";
import { CommandDeleteSpecialWord } from "../commands/delete/deleteSpecialWord.command";
import { CommandDeleteUntilNext } from "../commands/delete/deleteUntilNext.command";
import { CommandDeleteUntilNextSpecial } from "../commands/delete/deleteUntilNextSpecial.command";
import { CommandDeleteUntilPrevious } from "../commands/delete/deleteUntilPrevious.command";
import { CommandDeleteUntilPreviousSpecial } from "../commands/delete/deleteUntilPreviousSpecial.command";
import { CommandDeleteWord } from "../commands/delete/deleteWord.command";
import { CommandCopy } from "../commands/copy/copy.command";
import { CommandCut } from "../commands/cut/cut.command";
import { CommandDelete } from "../commands/delete/delete.command";
import { CommandAddLineAbove } from "../commands/misc/addLineAbove.command";
import { CommandModeInsert } from "../commands/mode/modeInsert.command";
import { CommandMotionBottom } from "../commands/motion/motionBottom.command";
import { CommandPasteBefore } from "../commands/paste/pasteBefore.command";
import { CommandSelectionSwap } from "../commands/select/selectionSwap.command";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { SFVimKeyHandler } from "../types/SFVimKeyHandler";
import { SFVimConfigManager } from "./config.handler";
import { CommandReplace } from "../commands/misc/replace.command";
import { CommandSearchInline } from "../commands/search/searchInline.command";
import { CommandSearchNextOccurance } from "../commands/search/searchNextOccurance.command";
import { CommandSearchPreviousOccurance } from "../commands/search/searchPreviousOccurance.command";
import { SFVimKeybindHandler } from "./keybind.handler";

interface SFVimBind {
    command: string;
    bind: string;
}

export class SFVimCommandHandler {
    private static _instance: SFVimCommandHandler;
    private commands: Array<SFVimCommand>;
    private keyHandlers: Array<SFVimKeyHandler>;
    private keybindHandler: SFVimKeybindHandler;

    lastKeyPress: number;
    lastKeys: string;

    constructor() {
        this.keybindHandler = new SFVimKeybindHandler();
        this.lastKeyPress = 0;
        this.lastKeys = "";
        this.commands = [];
        this.keyHandlers = [];
        this.registerCommands();
        SFVimCommandHandler._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
     public static instance(): SFVimCommandHandler {
        return SFVimCommandHandler._instance || new SFVimCommandHandler();
    }

    /**
     * Registers the given keyHandler
     * @param keyHandler the keyHandler that should be registered
     */
    registerKeyHandler(keyHandler: SFVimKeyHandler) {
        this.keyHandlers.push(keyHandler);
    }

    /**
     * Unregisters the given keyHandler
     * @param keyHandler the keyHandler that should be unregistered
     */
    unregisterKeyHandler(keyHandler: SFVimKeyHandler) {
        this.keyHandlers.splice(this.keyHandlers.findIndex(handler => handler === keyHandler), 1);
    }

    registerCommands() {
        this.commands.push(new CommandModeInsert());
        this.commands.push(new CommandModeInsertAppend());
        this.commands.push(new CommandModeInsertAppendLineEnd());
        this.commands.push(new CommandModeInsertLineStart());
        this.commands.push(new CommandModeNormal());
        this.commands.push(new CommandModeVisual());

        this.commands.push(new CommandMotionBottom());
        this.commands.push(new CommandMotionDown());
        this.commands.push(new CommandMotionHighestView());
        this.commands.push(new CommandMotionJump());
        this.commands.push(new CommandMotionLeft());
        this.commands.push(new CommandMotionLineEnd());
        this.commands.push(new CommandMotionLineStart());
        this.commands.push(new CommandMotionLowestView());
        this.commands.push(new CommandMotionMiddleView());
        this.commands.push(new CommandMotionNextEmptyLine());
        this.commands.push(new CommandMotionPreviousEmptyLine());
        this.commands.push(new CommandMotionRealLineEnd());
        this.commands.push(new CommandMotionRealLineStart());
        this.commands.push(new CommandMotionRight());
        this.commands.push(new CommandMotionScrollHalfPageDown());
        this.commands.push(new CommandMotionScrollHalfPageUp());
        this.commands.push(new CommandMotionSkipEndLeft());
        this.commands.push(new CommandMotionSkipEndLeftSpecial());
        this.commands.push(new CommandMotionSkipEndRight());
        this.commands.push(new CommandMotionSkipEndRightSpecial());
        this.commands.push(new CommandMotionSkipLeft());
        this.commands.push(new CommandMotionSkipLeftSpecial());
        this.commands.push(new CommandMotionSkipRight());
        this.commands.push(new CommandMotionSkipRightSpecial());
        this.commands.push(new CommandMotionTop());
        this.commands.push(new CommandMotionUp());

        this.commands.push(new CommandSelectionSwap());
        this.commands.push(new CommandSelectSpecialWord());
        this.commands.push(new CommandSelectUntilNext());
        this.commands.push(new CommandSelectUntilNextSpecial());
        this.commands.push(new CommandSelectUntilPrevious());
        this.commands.push(new CommandSelectUntilPreviousSpecial());
        this.commands.push(new CommandSelectWord());

        this.commands.push(new CommandAddLineAbove());
        this.commands.push(new CommandAddLineBelow());
        this.commands.push(new CommandAddTab());
        this.commands.push(new CommandRedo());
        this.commands.push(new CommandRemoveTab());
        this.commands.push(new CommandReplace());
        this.commands.push(new CommandReplaceInsert());
        this.commands.push(new CommandShiftLineDown());
        this.commands.push(new CommandShiftLineUp());
        this.commands.push(new CommandSuggestion());
        this.commands.push(new CommandUndo());

        this.commands.push(new CommandCopy());
        this.commands.push(new CommandCopyLine());
        this.commands.push(new CommandCopyLineDown());
        this.commands.push(new CommandCopyMoveFirst());
        this.commands.push(new CommandCopyMoveLast());
        this.commands.push(new CommandCopySpecialWord());
        this.commands.push(new CommandCopyUntilNext());
        this.commands.push(new CommandCopyUntilNextSpecial());
        this.commands.push(new CommandCopyUntilPrevious());
        this.commands.push(new CommandCopyUntilPreviousSpecial());
        this.commands.push(new CommandCopyWord());

        this.commands.push(new CommandCut());
        this.commands.push(new CommandCutLine());
        this.commands.push(new CommandCutSpecialWord());
        this.commands.push(new CommandCutUntilNext());
        this.commands.push(new CommandCutUntilNextSpecial());
        this.commands.push(new CommandCutUntilPrevious());
        this.commands.push(new CommandCutUntilPreviousSpecial());
        this.commands.push(new CommandCutWord());

        this.commands.push(new CommandPasteBefore());
        this.commands.push(new CommandPasteBeforeMoveBehind());
        this.commands.push(new CommandPasteBehind());
        this.commands.push(new CommandPasteBehindMoveBehind());
        this.commands.push(new CommandPasteReplace());
        this.commands.push(new CommandPasteReplaceMoveBehind());

        this.commands.push(new CommandDelete());
        this.commands.push(new CommandDeleteCharacter());
        this.commands.push(new CommandDeleteCharacterMoveLeft());
        this.commands.push(new CommandDeleteLine());
        this.commands.push(new CommandDeleteRightCharacter());
        this.commands.push(new CommandDeleteSpecialWord());
        this.commands.push(new CommandDeleteUntilNext());
        this.commands.push(new CommandDeleteUntilNextSpecial());
        this.commands.push(new CommandDeleteUntilPrevious());
        this.commands.push(new CommandDeleteUntilPreviousSpecial());
        this.commands.push(new CommandDeleteWord());

        this.commands.push(new CommandSearchInline());
        this.commands.push(new CommandSearchNextOccurance());
        this.commands.push(new CommandSearchPreviousOccurance());

        
        //This might come in handy the next time I update this addon

        /*
        let text = "";

        for(let c of this.commands) {
            text += "#### " + c.name + "\n\n" + "> " + c.description;
            text += "\n\n> Default bind: " + this.keybindHandler.keybindings.find(co => co.command === c.name)?.bind;
            text += "\n\n";
        }

        vscode.env.clipboard.writeText(text);*/
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

        let cancel = false;

        for(let handler of this.keyHandlers) {
            cancel ||= handler.handleKey(vimEditor, key);
        }

        if(cancel) {
            event.preventDefault();
            return;
        }
    
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
    
        const binds: Array<SFVimBind> = this.keybindHandler.keybindings.filter(bind => {
            const command = this.commands.find(command => command.name === bind.command);

            if(command && command.mode & currentMode) {
                return true;
            }

            return false;
        });
    
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
        const trigger = this.commands.filter(command => calledCommands.includes(command.name) && command.mode & currentMode);
    
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
            command.execute(vimEditor, vimEditor.amplifier);
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