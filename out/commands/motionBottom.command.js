"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionBottom = void 0;
const vscode = require("vscode");
function executeMotionBottom(vimEditor) {
    const lineCount = vimEditor.editor.document.lineCount;
    const currentPosition = vimEditor.editor.selection.active;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;
    const newPosition = vimEditor.editor.selection.active.with(lineCount - 1, character);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
}
exports.executeMotionBottom = executeMotionBottom;
//# sourceMappingURL=motionBottom.command.js.map