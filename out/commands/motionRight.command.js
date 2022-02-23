"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionRight = void 0;
const vscode = require("vscode");
function executeMotionRight(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const currentPosition = vimEditor.editor.selection.active;
    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line, currentPosition.character + amplifier);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}
exports.executeMotionRight = executeMotionRight;
//# sourceMappingURL=motionRight.command.js.map