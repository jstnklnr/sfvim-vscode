"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionTop = void 0;
const vscode = require("vscode");
function executeMotionTop(vimEditor) {
    const currentPosition = vimEditor.editor.selection.active;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;
    const newPosition = vimEditor.editor.selection.active.with(0, character);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
}
exports.executeMotionTop = executeMotionTop;
//# sourceMappingURL=motionTop.command.js.map