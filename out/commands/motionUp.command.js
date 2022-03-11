"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionUp = void 0;
const vscode = require("vscode");
const SFVimEditor_1 = require("../types/SFVimEditor");
function executeMotionUp(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const currentPosition = vimEditor.editor.selection.active;
    const offset = currentPosition.line - amplifier < 0 ? currentPosition.line : amplifier;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;
    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line - offset, character);
    let anchor = newPosition;
    if (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }
    vimEditor.editor.selection = new vscode.Selection(anchor, newPosition);
}
exports.executeMotionUp = executeMotionUp;
//# sourceMappingURL=motionUp.command.js.map