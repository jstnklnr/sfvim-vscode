"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionLeft = void 0;
const vscode = require("vscode");
const SFVimEditor_1 = require("../types/SFVimEditor");
function executeMotionLeft(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const currentPosition = vimEditor.editor.selection.active;
    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line, currentPosition.character - amplifier);
    let anchor = newPosition;
    if (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }
    vimEditor.editor.selection = new vscode.Selection(anchor, newPosition);
    vimEditor.editor.selection.isReversed = true;
    vimEditor.tags.set("lastCharacter", newPosition.character);
}
exports.executeMotionLeft = executeMotionLeft;
//# sourceMappingURL=motionLeft.command.js.map