"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionUp = void 0;
const vscode = require("vscode");
function executeMotionUp(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const currentPosition = vimEditor.editor.selection.active;
    const offset = currentPosition.line - amplifier < 0 ? currentPosition.line : amplifier;
    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line - offset, currentPosition.character);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
}
exports.executeMotionUp = executeMotionUp;
//# sourceMappingURL=motionUp.command.js.map