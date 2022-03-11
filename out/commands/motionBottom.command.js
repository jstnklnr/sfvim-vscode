"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionBottom = void 0;
const vscode = require("vscode");
const SFVimEditor_1 = require("../types/SFVimEditor");
function executeMotionBottom(vimEditor) {
    const lineCount = vimEditor.editor.document.lineCount;
    const currentPosition = vimEditor.editor.selection.active;
    const character = vimEditor.tags.get("lastCharacter") || currentPosition.character;
    const newPosition = vimEditor.editor.selection.active.with(lineCount - 1, character);
    let anchor = newPosition;
    if (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }
    vimEditor.editor.selection = new vscode.Selection(anchor, newPosition);
    //vimEditor.editor.selections = [new vscode.Selection(anchor, newPosition), new vscode.Selection(anchor.with(anchor.line, anchor.character - 2), anchor.with(anchor.line, anchor.character - 1))];
}
exports.executeMotionBottom = executeMotionBottom;
//# sourceMappingURL=motionBottom.command.js.map