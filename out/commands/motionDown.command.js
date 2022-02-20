"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionDown = void 0;
const vscode = require("vscode");
function executeMotionDown(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const lineCount = vimEditor.editor.document.lineCount;
    const currentPosition = vimEditor.editor.selection.active;
    const offset = currentPosition.line + amplifier >= lineCount ? lineCount - currentPosition.line : amplifier;
    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line + offset, currentPosition.character);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
}
exports.executeMotionDown = executeMotionDown;
//# sourceMappingURL=motionDown.command.js.map