"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionRight = void 0;
const vscode = require("vscode");
const SFVimEditor_1 = require("../types/SFVimEditor");
function executeMotionRight(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const currentPosition = vimEditor.editor.selection.active;
    const lineLength = vimEditor.editor.document.lineAt(currentPosition.line).text.length;
    let newCharacter = currentPosition.character + amplifier;
    if (newCharacter >= lineLength) {
        newCharacter = lineLength - 1;
    }
    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line, newCharacter);
    let anchor = newPosition;
    if (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }
    vimEditor.editor.selection = new vscode.Selection(anchor, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}
exports.executeMotionRight = executeMotionRight;
//# sourceMappingURL=motionRight.command.js.map