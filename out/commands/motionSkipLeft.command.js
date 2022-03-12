"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionSkipLeft = void 0;
const selection_handler_1 = require("../handlers/selection.handler");
const SFVimEditor_1 = require("../types/SFVimEditor");
const selection_util_1 = require("../utilities/selection.util");
function executeMotionSkipLeft(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const currentPosition = vimEditor.editor.selection.active;
    let line = currentPosition.line;
    let character = currentPosition.character;
    let lineText = vimEditor.editor.document.lineAt(line).text;
    let anchor = currentPosition;
    if (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || currentPosition;
    }
    let isPositionAdjusted = vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL && (0, selection_util_1.isAdjustedPostion)(anchor, currentPosition);
    if (isPositionAdjusted) {
        character -= character > 0 ? 1 : 0;
    }
    for (let i = 0; i < amplifier; i++) {
        let lineBreak = false;
        if (character <= 0) {
            line--;
            lineText = vimEditor.editor.document.lineAt(line).text;
            character = lineText.length;
            lineBreak = true;
        }
        let j = character;
        let skipType = 0;
        if (j > 0 && j <= lineText.length) {
            if (/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j - 1])?.length) {
                skipType = 1;
            }
            else if (!/^\s$/.exec(lineText[j - 1])?.length) {
                skipType = 2;
            }
        }
        while (j > 0) {
            const isLetter = /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j - 1])?.length;
            const isSpace = /^\s$/.exec(lineText[j - 1])?.length;
            if (skipType == 0 && !isSpace) {
                skipType = isLetter ? 1 : 2;
            }
            else if (skipType == 1 && !isLetter || skipType == 2 && (isLetter || isSpace)) {
                break;
            }
            j--;
        }
        character = j;
    }
    let newPosition = vimEditor.editor.selection.active.with(line, character);
    if (!(vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL)) {
        anchor = newPosition;
    }
    isPositionAdjusted = vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL && (0, selection_util_1.isAdjustedPostion)(anchor, newPosition);
    if (isPositionAdjusted) {
        newPosition = (0, selection_util_1.getRightPosition)(newPosition);
    }
    (0, selection_handler_1.handleSelection)(vimEditor, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}
exports.executeMotionSkipLeft = executeMotionSkipLeft;
//# sourceMappingURL=motionSkipLeft.command.js.map