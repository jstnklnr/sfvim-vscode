"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionSkipRight = void 0;
const selection_handler_1 = require("../handlers/selection.handler");
const SFVimEditor_1 = require("../types/SFVimEditor");
const selection_util_1 = require("../utilities/selection.util");
function executeMotionSkipRight(vimEditor, amplifier, includeSpecial = false) {
    if (amplifier == 0) {
        amplifier = 1;
    }
    const visualMode = vimEditor.mode & SFVimEditor_1.SFVimMode.VISUAL;
    const anchor = vimEditor.editor.selection.anchor;
    let active = vimEditor.editor.selection.active;
    if (visualMode && (0, selection_util_1.isAdjustedPostion)(anchor, active)) {
        active = (0, selection_util_1.getLeftPosition)(active);
    }
    for (let i = 0; i < amplifier; i++) {
        active = (0, selection_util_1.getStartOfNextWord)(vimEditor, active, includeSpecial) || (0, selection_util_1.getEndOfLine)(vimEditor, active.line);
    }
    active = visualMode && (0, selection_util_1.isAdjustedPostion)(anchor, active) ? (0, selection_util_1.getRightPosition)(active) : active;
    (0, selection_handler_1.handleSelection)(vimEditor, active);
    vimEditor.tags.set("lastCharacter", active.character);
}
exports.executeMotionSkipRight = executeMotionSkipRight;
//# sourceMappingURL=motionSkipRight.command.js.map