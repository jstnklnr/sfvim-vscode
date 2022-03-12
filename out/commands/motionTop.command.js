"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionTop = void 0;
const selection_handler_1 = require("../handlers/selection.handler");
const SFVimEditor_1 = require("../types/SFVimEditor");
function executeMotionTop(vimEditor) {
    const currentPosition = vimEditor.editor.selection.active;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;
    const newPosition = vimEditor.editor.selection.active.with(0, character);
    let anchor = newPosition;
    if (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }
    (0, selection_handler_1.handleSelection)(vimEditor, newPosition);
}
exports.executeMotionTop = executeMotionTop;
//# sourceMappingURL=motionTop.command.js.map