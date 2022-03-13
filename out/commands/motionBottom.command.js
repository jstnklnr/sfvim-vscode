"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionBottom = void 0;
const jump_command_1 = require("./jump.command");
function executeMotionBottom(vimEditor, amplifier) {
    if (amplifier != 0) {
        return;
    }
    (0, jump_command_1.executeMotionJump)(vimEditor, vimEditor.editor.document.lineCount);
}
exports.executeMotionBottom = executeMotionBottom;
//# sourceMappingURL=motionBottom.command.js.map