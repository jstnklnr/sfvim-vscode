"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionSkipRight = void 0;
const vscode = require("vscode");
function executeMotionSkipRight(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const currentPosition = vimEditor.editor.selection.active;
    const lineText = vimEditor.editor.document.lineAt(currentPosition.line).text;
    let character = currentPosition.character;
    //TODO: handle ö, ä, ü, ... and line breaks
    for (let i = 0; i < amplifier; i++) {
        let j = character;
        let skipType = 0;
        if (j < lineText.length) {
            if (/^[a-zA-Z0-9_]$/.exec(lineText[j])?.length) {
                skipType = 1;
            }
            else if (/^\s$/.exec(lineText[j])?.length) {
                skipType = 2;
            }
        }
        while (j < lineText.length && (skipType == 0 && /^[^a-zA-Z0-9_ ]$/.exec(lineText[j])?.length
            || skipType == 1 && /^[a-zA-Z0-9_]$/.exec(lineText[j])?.length
            || skipType == 2 && /^\s$/.exec(lineText[j])?.length)) {
            j++;
        }
        character = j;
    }
    const newPosition = vimEditor.editor.selection.active.with(currentPosition.line, character);
    vimEditor.editor.selection = new vscode.Selection(newPosition, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}
exports.executeMotionSkipRight = executeMotionSkipRight;
//# sourceMappingURL=motionSkipRight.command.js.map