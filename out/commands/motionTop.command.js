"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionTop = void 0;
const jump_command_1 = require("./jump.command");
function executeMotionTop(vimEditor, amplifier) {
    if (amplifier != 0) {
        return;
    }
    (0, jump_command_1.executeMotionJump)(vimEditor, 1);
}
exports.executeMotionTop = executeMotionTop;
//# sourceMappingURL=motionTop.command.js.map