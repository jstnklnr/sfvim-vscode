"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFVimEditor = exports.SFVimMode = void 0;
var SFVimMode;
(function (SFVimMode) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SFVimMode[SFVimMode["NORMAL"] = 1] = "NORMAL";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SFVimMode[SFVimMode["INSERT"] = 2] = "INSERT";
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SFVimMode[SFVimMode["VISUAL"] = 4] = "VISUAL";
})(SFVimMode = exports.SFVimMode || (exports.SFVimMode = {}));
class SFVimEditor {
    constructor(editor, statusCallback) {
        this.editor = editor;
        this.mode = SFVimMode.NORMAL;
        this.tags = new Map();
        this.amplifier = 0;
        this.stringAmplifier = "";
        this.statusCallback = statusCallback;
    }
    changeMode(mode) {
        this.mode = mode;
    }
    callStatusCallback() {
        this.statusCallback(this);
    }
}
exports.SFVimEditor = SFVimEditor;
//# sourceMappingURL=SFVimEditor.js.map