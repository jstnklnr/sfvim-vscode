"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeMotionTop = void 0;
const motionJump_command_1 = require("./motionJump.command");
function executeMotionTop(vimEditor, amplifier) {
    if (amplifier != 0) {
        return;
    }
    (0, motionJump_command_1.executeMotionJump)(vimEditor, 1);
}
exports.executeMotionTop = executeMotionTop;
//# sourceMappingURL=motionTop.command.js.map