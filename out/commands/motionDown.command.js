"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionDown = void 0;
const selection_handler_1 = require("../handlers/selection.handler");
const SFVimEditor_1 = require("../types/SFVimEditor");
function executeMotionDown(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const lineCount = vimEditor.editor.document.lineCount - 1;
    const currentPosition = vimEditor.editor.selection.active;
    const offset = currentPosition.line + amplifier >= lineCount ? lineCount - currentPosition.line : amplifier;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;
    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line + offset, character);
    let anchor = newPosition;
    if (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }
    (0, selection_handler_1.handleSelection)(vimEditor, newPosition);
}
exports.executeMotionDown = executeMotionDown;
//# sourceMappingURL=motionDown.command.js.map