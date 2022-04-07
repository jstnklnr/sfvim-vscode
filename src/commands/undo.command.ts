import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionJump } from "./motionJump.command";
import * as vscode from "vscode";

export function executeUndo(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier == 0) {
        amplifier = 1;
    }

    for(let i = 0; i < amplifier; i++) {
        vscode.commands.executeCommand("undo");
    }

    executeMotionJump(vimEditor, vimEditor.editor.document.lineCount);
}