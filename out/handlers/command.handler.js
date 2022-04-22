"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFVimCommandHandler = void 0;
const vscode = require("vscode");
const modeInsertAppend_command_1 = require("../commands/mode/modeInsertAppend.command");
const modeInsertAppendLineEnd_command_1 = require("../commands/mode/modeInsertAppendLineEnd.command");
const modeInsertLineStart_command_1 = require("../commands/mode/modeInsertLineStart.command");
const modeNormal_command_1 = require("../commands/mode/modeNormal.command");
const modeVisual_command_1 = require("../commands/mode/modeVisual.command");
const motionDown_command_1 = require("../commands/motion/motionDown.command");
const motionHighestView_command_1 = require("../commands/motion/motionHighestView.command");
const motionJump_command_1 = require("../commands/motion/motionJump.command");
const motionLeft_command_1 = require("../commands/motion/motionLeft.command");
const motionLineEnd_command_1 = require("../commands/motion/motionLineEnd.command");
const motionLineStart_command_1 = require("../commands/motion/motionLineStart.command");
const motionLowestView_command_1 = require("../commands/motion/motionLowestView.command");
const motionMiddleView_command_1 = require("../commands/motion/motionMiddleView.command");
const motionNextEmptyLine_command_1 = require("../commands/motion/motionNextEmptyLine.command");
const motionPreviousEmptyLine_command_1 = require("../commands/motion/motionPreviousEmptyLine.command");
const motionRealLineEnd_command_1 = require("../commands/motion/motionRealLineEnd.command");
const motionRealLineStart_command_1 = require("../commands/motion/motionRealLineStart.command");
const motionRight_command_1 = require("../commands/motion/motionRight.command");
const motionScrollHalfPageDown_command_1 = require("../commands/motion/motionScrollHalfPageDown.command");
const motionScrollHalfPageUp_command_1 = require("../commands/motion/motionScrollHalfPageUp.command");
const motionSkipEndLeft_command_1 = require("../commands/motion/motionSkipEndLeft.command");
const motionSkipEndLeftSpecial_command_1 = require("../commands/motion/motionSkipEndLeftSpecial.command");
const motionSkipEndRight_command_1 = require("../commands/motion/motionSkipEndRight.command");
const motionSkipEndRightSpecial_command_1 = require("../commands/motion/motionSkipEndRightSpecial.command");
const motionSkipLeft_command_1 = require("../commands/motion/motionSkipLeft.command");
const motionSkipLeftSpecial_command_1 = require("../commands/motion/motionSkipLeftSpecial.command");
const motionSkipRight_command_1 = require("../commands/motion/motionSkipRight.command");
const motionSkipRightSpecial_command_1 = require("../commands/motion/motionSkipRightSpecial.command");
const motionTop_command_1 = require("../commands/motion/motionTop.command");
const motionUp_command_1 = require("../commands/motion/motionUp.command");
const selectSpecialWord_command_1 = require("../commands/select/selectSpecialWord.command");
const selectUntilNext_command_1 = require("../commands/select/selectUntilNext.command");
const selectUntilNextSpecial_command_1 = require("../commands/select/selectUntilNextSpecial.command");
const selectUntilPrevious_command_1 = require("../commands/select/selectUntilPrevious.command");
const selectUntilPreviousSpecial_command_1 = require("../commands/select/selectUntilPreviousSpecial.command");
const selectWord_command_1 = require("../commands/select/selectWord.command");
const addLineBelow_command_1 = require("../commands/misc/addLineBelow.command");
const addTab_command_1 = require("../commands/misc/addTab.command");
const redo_command_1 = require("../commands/misc/redo.command");
const removeTab_command_1 = require("../commands/misc/removeTab.command");
const replaceInsert_command_1 = require("../commands/misc/replaceInsert.command");
const shiftLineDown_command_1 = require("../commands/misc/shiftLineDown.command");
const shiftLineUp_command_1 = require("../commands/misc/shiftLineUp.command");
const suggestion_command_1 = require("../commands/misc/suggestion.command");
const undo_command_1 = require("../commands/misc/undo.command");
const copyLine_command_1 = require("../commands/copy/copyLine.command");
const copyLineDown_command_1 = require("../commands/copy/copyLineDown.command");
const copyMoveFirst_command_1 = require("../commands/copy/copyMoveFirst.command");
const copyMoveLast_command_1 = require("../commands/copy/copyMoveLast.command");
const copySpecialWord_command_1 = require("../commands/copy/copySpecialWord.command");
const copyUntilNext_command_1 = require("../commands/copy/copyUntilNext.command");
const copyUntilNextSpecial_command_1 = require("../commands/copy/copyUntilNextSpecial.command");
const copyUntilPrevious_command_1 = require("../commands/copy/copyUntilPrevious.command");
const copyUntilPreviousSpecial_command_1 = require("../commands/copy/copyUntilPreviousSpecial.command");
const copyWord_command_1 = require("../commands/copy/copyWord.command");
const cutLine_command_1 = require("../commands/cut/cutLine.command");
const cutSpecialWord_command_1 = require("../commands/cut/cutSpecialWord.command");
const cutUntilNext_command_1 = require("../commands/cut/cutUntilNext.command");
const cutUntilNextSpecial_command_1 = require("../commands/cut/cutUntilNextSpecial.command");
const cutUntilPrevious_command_1 = require("../commands/cut/cutUntilPrevious.command");
const cutUntilPreviousSpecial_command_1 = require("../commands/cut/cutUntilPreviousSpecial.command");
const cutWord_command_1 = require("../commands/cut/cutWord.command");
const pasteBeforeMoveBehind_command_1 = require("../commands/paste/pasteBeforeMoveBehind.command");
const pasteBehind_command_1 = require("../commands/paste/pasteBehind.command");
const pasteBehindMoveBehind_command_1 = require("../commands/paste/pasteBehindMoveBehind.command");
const pasteReplace_command_1 = require("../commands/paste/pasteReplace.command");
const pasteReplaceMoveBehind_command_1 = require("../commands/paste/pasteReplaceMoveBehind.command");
const deleteCharacter_command_1 = require("../commands/delete/deleteCharacter.command");
const deleteCharacterMoveLeft_command_1 = require("../commands/delete/deleteCharacterMoveLeft.command");
const deleteLine_command_1 = require("../commands/delete/deleteLine.command");
const deleteRightCharacter_command_1 = require("../commands/delete/deleteRightCharacter.command");
const deleteSpecialWord_command_1 = require("../commands/delete/deleteSpecialWord.command");
const deleteUntilNext_command_1 = require("../commands/delete/deleteUntilNext.command");
const deleteUntilNextSpecial_command_1 = require("../commands/delete/deleteUntilNextSpecial.command");
const deleteUntilPrevious_command_1 = require("../commands/delete/deleteUntilPrevious.command");
const deleteUntilPreviousSpecial_command_1 = require("../commands/delete/deleteUntilPreviousSpecial.command");
const deleteWord_command_1 = require("../commands/delete/deleteWord.command");
const copy_command_1 = require("../commands/copy/copy.command");
const cut_command_1 = require("../commands/cut/cut.command");
const delete_command_1 = require("../commands/delete/delete.command");
const addLineAbove_command_1 = require("../commands/misc/addLineAbove.command");
const modeInsert_command_1 = require("../commands/mode/modeInsert.command");
const motionBottom_command_1 = require("../commands/motion/motionBottom.command");
const pasteBefore_command_1 = require("../commands/paste/pasteBefore.command");
const selectionSwap_command_1 = require("../commands/select/selectionSwap.command");
const SFVimEditor_1 = require("../types/SFVimEditor");
const config_handler_1 = require("./config.handler");
const replace_command_1 = require("../commands/misc/replace.command");
const searchInline_command_1 = require("../commands/search/searchInline.command");
const searchNextOccurance_command_1 = require("../commands/search/searchNextOccurance.command");
const searchPreviousOccurance_command_1 = require("../commands/search/searchPreviousOccurance.command");
class SFVimCommandHandler {
    constructor() {
        this.config = config_handler_1.SFVimConfigHandler.instance().getConfig("sfvim");
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
    static instance() {
        return SFVimCommandHandler._instance || new SFVimCommandHandler();
    }
    /**
     * Registers the given keyHandler
     * @param keyHandler the keyHandler that should be registered
     */
    registerKeyHandler(keyHandler) {
        this.keyHandlers.push(keyHandler);
    }
    /**
     * Unregisters the given keyHandler
     * @param keyHandler the keyHandler that should be unregistered
     */
    unregisterKeyHandler(keyHandler) {
        this.keyHandlers.splice(this.keyHandlers.findIndex(handler => handler === keyHandler), 1);
    }
    registerCommands() {
        this.commands.push(new modeInsert_command_1.CommandModeInsert());
        this.commands.push(new modeInsertAppend_command_1.CommandModeInsertAppend());
        this.commands.push(new modeInsertAppendLineEnd_command_1.CommandModeInsertAppendLineEnd());
        this.commands.push(new modeInsertLineStart_command_1.CommandModeInsertLineStart());
        this.commands.push(new modeNormal_command_1.CommandModeNormal());
        this.commands.push(new modeVisual_command_1.CommandModeVisual());
        this.commands.push(new motionBottom_command_1.CommandMotionBottom());
        this.commands.push(new motionDown_command_1.CommandMotionDown());
        this.commands.push(new motionHighestView_command_1.CommandMotionHighestView());
        this.commands.push(new motionJump_command_1.CommandMotionJump());
        this.commands.push(new motionLeft_command_1.CommandMotionLeft());
        this.commands.push(new motionLineEnd_command_1.CommandMotionLineEnd());
        this.commands.push(new motionLineStart_command_1.CommandMotionLineStart());
        this.commands.push(new motionLowestView_command_1.CommandMotionLowestView());
        this.commands.push(new motionMiddleView_command_1.CommandMotionMiddleView());
        this.commands.push(new motionNextEmptyLine_command_1.CommandMotionNextEmptyLine());
        this.commands.push(new motionPreviousEmptyLine_command_1.CommandMotionPreviousEmptyLine());
        this.commands.push(new motionRealLineEnd_command_1.CommandMotionRealLineEnd());
        this.commands.push(new motionRealLineStart_command_1.CommandMotionRealLineStart());
        this.commands.push(new motionRight_command_1.CommandMotionRight());
        this.commands.push(new motionScrollHalfPageDown_command_1.CommandMotionScrollHalfPageDown());
        this.commands.push(new motionScrollHalfPageUp_command_1.CommandMotionScrollHalfPageUp());
        this.commands.push(new motionSkipEndLeft_command_1.CommandMotionSkipEndLeft());
        this.commands.push(new motionSkipEndLeftSpecial_command_1.CommandMotionSkipEndLeftSpecial());
        this.commands.push(new motionSkipEndRight_command_1.CommandMotionSkipEndRight());
        this.commands.push(new motionSkipEndRightSpecial_command_1.CommandMotionSkipEndRightSpecial());
        this.commands.push(new motionSkipLeft_command_1.CommandMotionSkipLeft());
        this.commands.push(new motionSkipLeftSpecial_command_1.CommandMotionSkipLeftSpecial());
        this.commands.push(new motionSkipRight_command_1.CommandMotionSkipRight());
        this.commands.push(new motionSkipRightSpecial_command_1.CommandMotionSkipRightSpecial());
        this.commands.push(new motionTop_command_1.CommandMotionTop());
        this.commands.push(new motionUp_command_1.CommandMotionUp());
        this.commands.push(new selectionSwap_command_1.CommandSelectionSwap());
        this.commands.push(new selectSpecialWord_command_1.CommandSelectSpecialWord());
        this.commands.push(new selectUntilNext_command_1.CommandSelectUntilNext());
        this.commands.push(new selectUntilNextSpecial_command_1.CommandSelectUntilNextSpecial());
        this.commands.push(new selectUntilPrevious_command_1.CommandSelectUntilPrevious());
        this.commands.push(new selectUntilPreviousSpecial_command_1.CommandSelectUntilPreviousSpecial());
        this.commands.push(new selectWord_command_1.CommandSelectWord());
        this.commands.push(new addLineAbove_command_1.CommandAddLineAbove());
        this.commands.push(new addLineBelow_command_1.CommandAddLineBelow());
        this.commands.push(new addTab_command_1.CommandAddTab());
        this.commands.push(new redo_command_1.CommandRedo());
        this.commands.push(new removeTab_command_1.CommandRemoveTab());
        this.commands.push(new replace_command_1.CommandReplace());
        this.commands.push(new replaceInsert_command_1.CommandReplaceInsert());
        this.commands.push(new shiftLineDown_command_1.CommandShiftLineDown());
        this.commands.push(new shiftLineUp_command_1.CommandShiftLineUp());
        this.commands.push(new suggestion_command_1.CommandSuggestion());
        this.commands.push(new undo_command_1.CommandUndo());
        this.commands.push(new copy_command_1.CommandCopy());
        this.commands.push(new copyLine_command_1.CommandCopyLine());
        this.commands.push(new copyLineDown_command_1.CommandCopyLineDown());
        this.commands.push(new copyMoveFirst_command_1.CommandCopyMoveFirst());
        this.commands.push(new copyMoveLast_command_1.CommandCopyMoveLast());
        this.commands.push(new copySpecialWord_command_1.CommandCopySpecialWord());
        this.commands.push(new copyUntilNext_command_1.CommandCopyUntilNext());
        this.commands.push(new copyUntilNextSpecial_command_1.CommandCopyUntilNextSpecial());
        this.commands.push(new copyUntilPrevious_command_1.CommandCopyUntilPrevious());
        this.commands.push(new copyUntilPreviousSpecial_command_1.CommandCopyUntilPreviousSpecial());
        this.commands.push(new copyWord_command_1.CommandCopyWord());
        this.commands.push(new cut_command_1.CommandCut());
        this.commands.push(new cutLine_command_1.CommandCutLine());
        this.commands.push(new cutSpecialWord_command_1.CommandCutSpecialWord());
        this.commands.push(new cutUntilNext_command_1.CommandCutUntilNext());
        this.commands.push(new cutUntilNextSpecial_command_1.CommandCutUntilNextSpecial());
        this.commands.push(new cutUntilPrevious_command_1.CommandCutUntilPrevious());
        this.commands.push(new cutUntilPreviousSpecial_command_1.CommandCutUntilPreviousSpecial());
        this.commands.push(new cutWord_command_1.CommandCutWord());
        this.commands.push(new pasteBefore_command_1.CommandPasteBefore());
        this.commands.push(new pasteBeforeMoveBehind_command_1.CommandPasteBeforeMoveBehind());
        this.commands.push(new pasteBehind_command_1.CommandPasteBehind());
        this.commands.push(new pasteBehindMoveBehind_command_1.CommandPasteBehindMoveBehind());
        this.commands.push(new pasteReplace_command_1.CommandPasteReplace());
        this.commands.push(new pasteReplaceMoveBehind_command_1.CommandPasteReplaceMoveBehind());
        this.commands.push(new delete_command_1.CommandDelete());
        this.commands.push(new deleteCharacter_command_1.CommandDeleteCharacter());
        this.commands.push(new deleteCharacterMoveLeft_command_1.CommandDeleteCharacterMoveLeft());
        this.commands.push(new deleteLine_command_1.CommandDeleteLine());
        this.commands.push(new deleteRightCharacter_command_1.CommandDeleteRightCharacter());
        this.commands.push(new deleteSpecialWord_command_1.CommandDeleteSpecialWord());
        this.commands.push(new deleteUntilNext_command_1.CommandDeleteUntilNext());
        this.commands.push(new deleteUntilNextSpecial_command_1.CommandDeleteUntilNextSpecial());
        this.commands.push(new deleteUntilPrevious_command_1.CommandDeleteUntilPrevious());
        this.commands.push(new deleteUntilPreviousSpecial_command_1.CommandDeleteUntilPreviousSpecial());
        this.commands.push(new deleteWord_command_1.CommandDeleteWord());
        this.commands.push(new searchInline_command_1.CommandSearchInline());
        this.commands.push(new searchNextOccurance_command_1.CommandSearchNextOccurance());
        this.commands.push(new searchPreviousOccurance_command_1.CommandSearchPreviousOccurance());
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
        let cancel = false;
        for (let handler of this.keyHandlers) {
            cancel || (cancel = handler.handleKey(vimEditor, key));
        }
        if (cancel) {
            event.preventDefault();
            return;
        }
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
        const trigger = this.commands.filter(command => calledCommands.includes(command.name) && command.mode & currentMode);
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
            command.execute(vimEditor, vimEditor.amplifier);
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
exports.SFVimCommandHandler = SFVimCommandHandler;
//# sourceMappingURL=command.handler.js.map