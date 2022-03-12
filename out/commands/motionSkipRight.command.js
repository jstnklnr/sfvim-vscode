"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionSkipRight = void 0;
const selection_handler_1 = require("../handlers/selection.handler");
const SFVimEditor_1 = require("../types/SFVimEditor");
const selection_util_1 = require("../utilities/selection.util");
function executeMotionSkipRight(vimEditor, amplifier) {
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
    const isPositionAdjusted = vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL && (0, selection_util_1.isAdjustedPostion)(anchor, currentPosition);
    if (isPositionAdjusted) {
        character -= character > 0 ? 1 : 0;
    }
    for (let i = 0; i < amplifier; i++) {
        let lineBreak = false;
        if (character >= lineText.length - 1) {
            line++;
            character = 0;
            lineText = vimEditor.editor.document.lineAt(line).text;
            lineBreak = true;
        }
        let j = character;
        let skipType = 0;
        if (j < lineText.length - 1) {
            if (/^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j + 1])?.length) {
                skipType = 1;
            }
            else if (/^\s$/.exec(lineText[j + 1])?.length) {
                skipType = 2;
            }
        }
        if (lineBreak) {
            skipType = 2;
        }
        while (j < lineText.length - 1
            && (skipType == 0 && /^[^a-zA-Z0-9\u00C0-\u02DB8_ ]$/.exec(lineText[j + 1])?.length
                || skipType == 1 && /^[a-zA-Z0-9\u00C0-\u02DB8_]$/.exec(lineText[j + 1])?.length
                || skipType == 2 && (/^\s$/.exec(lineText[j])?.length || j == character && !lineBreak))) {
            j++;
        }
        character = j;
    }
    let newPosition = vimEditor.editor.selection.active.with(line, character);
    if (!(vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL)) {
        anchor = newPosition;
    }
    if (isPositionAdjusted) {
        newPosition = (0, selection_util_1.getRightPosition)(newPosition);
    }
    (0, selection_handler_1.handleSelection)(vimEditor, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}
exports.executeMotionSkipRight = executeMotionSkipRight;
//# sourceMappingURL=motionSkipRight.command.js.map