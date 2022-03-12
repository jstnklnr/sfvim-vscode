"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionLeft = void 0;
const selection_handler_1 = require("../handlers/selection.handler");
const SFVimEditor_1 = require("../types/SFVimEditor");
const selection_util_1 = require("../utilities/selection.util");
function executeMotionLeft(vimEditor, amplifier) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const currentPosition = vimEditor.editor.selection.active;
    const newPosition = (0, selection_util_1.getOffsetPosition)(currentPosition, 0, -amplifier);
    let anchor = newPosition;
    if (vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL) {
        anchor = vimEditor.tags.get("anchor") || newPosition;
    }
    (0, selection_handler_1.handleSelection)(vimEditor, newPosition);
    vimEditor.tags.set("lastCharacter", newPosition.character);
}
exports.executeMotionLeft = executeMotionLeft;
//# sourceMappingURL=motionLeft.command.js.map