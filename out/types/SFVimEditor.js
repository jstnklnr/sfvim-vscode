"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFVimEditor = exports.SFVimMode = void 0;
var SFVimMode;
(function (SFVimMode) {
    SFVimMode[SFVimMode["NORMAL"] = 1] = "NORMAL";
    SFVimMode[SFVimMode["INSERT"] = 2] = "INSERT";
    SFVimMode[SFVimMode["VISUAL"] = 4] = "VISUAL";
})(SFVimMode = exports.SFVimMode || (exports.SFVimMode = {}));
class SFVimEditor {
    constructor(editor, config, statusCallback) {
        this.editor = editor;
        this.config = config;
        this.mode = SFVimMode.NORMAL;
        this.tags = new Map();
        this.amplifier = 0;
        this.stringAmplifier = "";
        this.statusCallback = statusCallback;
    }
    callStatusCallback() {
        this.statusCallback(this);
    }
}
exports.SFVimEditor = SFVimEditor;
//# sourceMappingURL=SFVimEditor.js.map