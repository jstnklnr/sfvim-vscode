"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionSkipLeft = void 0;
const selection_handler_1 = require("../handlers/selection.handler");
const SFVimEditor_1 = require("../types/SFVimEditor");
const selection_util_1 = require("../utilities/selection.util");
function executeMotionSkipLeft(vimEditor, amplifier, includeSpecial = false) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const visualMode = vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL;
    const anchor = vimEditor.editor.selection.anchor;
    let active = vimEditor.editor.selection.active;
    if (visualMode && (0, selection_util_1.isAdjustedPostion)(anchor, active)) {
        active = (0, selection_util_1.getLeftPosition)(active);
    }
    const startOfCurrent = (0, selection_util_1.getStartOfWord)(vimEditor, active, includeSpecial);
    if (startOfCurrent && (0, selection_util_1.getRelativePosition)(startOfCurrent, active) == selection_util_1.RelativeDirection.Right) {
        active = (0, selection_util_1.getStartOfWord)(vimEditor, active, includeSpecial);
        amplifier--;
    }
    for (let i = 0; i < amplifier; i++) {
        active = (0, selection_util_1.getStartOfPreviousWord)(vimEditor, active, includeSpecial) || (0, selection_util_1.getStartOfLine)(vimEditor, active.line);
    }
    active = visualMode && (0, selection_util_1.isAdjustedPostion)(anchor, active) ? (0, selection_util_1.getRightPosition)(active) : active;
    (0, selection_handler_1.handleSelection)(vimEditor, active);
    vimEditor.tags.set("lastCharacter", active.character);
}
exports.executeMotionSkipLeft = executeMotionSkipLeft;
//# sourceMappingURL=motionSkipLeft.command.js.map