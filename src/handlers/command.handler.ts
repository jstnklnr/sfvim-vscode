import { executeMotionDown } from "../commands/motionDown.command";
import { executeMotionUp } from "../commands/motionUp.command";
import { SFVimEditor, SFVimMode } from "../types/SFVimEditor";
import { executeMotionLeft } from "../commands/motionLeft.command";
import { executeMotionRight } from "../commands/motionRight.command";
import { executeMotionSkipLeft } from "../commands/motionSkipLeft.command";
import { executeMotionSkipRight } from "../commands/motionSkipRight.command";
import { executeMotionTop } from "../commands/motionTop.command";
import { executeMotionBottom } from "../commands/motionBottom.command";
import * as vscode from "vscode";
import { executeModeChangeNormal } from "../commands/modeNormal.command";
import { executeModeChangeInsert } from "../commands/modeInsert.command";
import { executeModeChangeVisual } from "../commands/modeVisual.command";

interface SFVimCommand {
    name: string;
    mode: number;
    description: string;
    handler: (editor: SFVimEditor, amplifier: number) => void;
}

interface SFVimBind {
    command: string;
    bind: string;
}

const commands: Array<SFVimCommand> = [
    {
        name: "mode.normal",
        mode: SFVimMode.INSERT,
        description: "Switches the current editor mode to NORMAL",
        handler: (editor) => executeModeChangeNormal(editor)
    },
    {
        name: "mode.insert",
        mode: SFVimMode.NORMAL,
        description: "Switches the current editor mode to INSERT",
        handler: (editor) => executeModeChangeInsert(editor)
    },
    {
        name: "mode.visual",
        mode: SFVimMode.NORMAL & SFVimMode.VISUAL,
        description: "Toggles between visual and normal mode",
        handler: (editor) => executeModeChangeVisual(editor)
    },
    {
        name: "motion.up",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the line above",
        handler: executeMotionUp
    },
    {
        name: "motion.down",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the line below",
        handler: executeMotionDown
    },
    {
        name: "motion.left",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the character to the left",
        handler: executeMotionLeft
    },
    {
        name: "motion.right",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the character to the right",
        handler: executeMotionRight
    },
    {
        name: "motion.skipLeft",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the word to the left",
        handler: executeMotionSkipLeft
    },
    {
        name: "motion.skipRight",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the word to the right",
        handler: executeMotionSkipRight
    },
    {
        name: "motion.top",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the top of the document",
        handler: executeMotionTop
    },
    {
        name: "motion.bottom",
        mode: SFVimMode.NORMAL,
        description: "Moves the cursor to the bottom of the document",
        handler: executeMotionBottom
    }
];

export class CommandHandler {
    config: any;
    lastKeyPress: number;
    lastKeys: string;

    constructor(config: any) {
        this.config = config;
        this.lastKeyPress = 0;
        this.lastKeys = "";
    }

    updateAmplifier(editor: SFVimEditor, key: string) {
        const timeDifference = Date.now() - this.lastKeyPress;
        editor.stringAmplifier = timeDifference > 500 ? key : editor.stringAmplifier + key;
        editor.amplifier = parseInt(editor.stringAmplifier);
        editor.callStatusCallback();
    }

    handleKeys(vimEditor: SFVimEditor, event: any) {
        const currentTime = Date.now();
    
        if(currentTime - 500 > this.lastKeyPress) {
            this.lastKeys = "";
        }
        
        if(event === undefined) {
            return;
        }
        
        const currentMode = vimEditor.mode;
        const key: string = event.text;
    
        if(key === undefined || key === "\n") {
            if(currentMode & SFVimMode.NORMAL) {
                event.preventDefault();
            }
    
            return;
        }
    
        if(currentMode & SFVimMode.NORMAL && /^\d+$/.exec(key)?.length) {
            this.updateAmplifier(vimEditor, key);
            this.lastKeyPress = currentTime;
    
            event.preventDefault();
            return;
        }
    
        const binds: Array<SFVimBind> = currentMode & SFVimMode.NORMAL ? this.config["normalModeKeybindings"] : this.config["insertModeKeybindings"];
    
        if(binds === undefined) {
            if(currentMode & SFVimMode.NORMAL) {
                event.preventDefault();
            }
    
            return;
        }
    
        const pressedKeys = `${this.lastKeys}${key}`;
        const potential = binds.filter(bind => bind.bind.startsWith(pressedKeys));
    
        const called = potential.filter(bind => 
            currentTime - 500 <= this.lastKeyPress && bind.bind === pressedKeys || bind.bind === key
        );
    
        const calledCommands = called.map(bind => bind.command);
        const trigger = commands.filter(command => calledCommands.includes(command.name));
    
        if(currentMode === SFVimMode.INSERT && trigger.length > 0) {
            const line = vimEditor.editor.selection.active.line;
            const character = vimEditor.editor.selection.active.character;
    
            vimEditor.editor.edit(editBuilder => {
                editBuilder.delete(new vscode.Range(line, character - (pressedKeys.length - 1), line, character));
            });
        }
    
        for(const command of trigger) {
            command.handler(vimEditor, vimEditor.amplifier);
        }
        
        vimEditor.amplifier = trigger.length > 0 ? 0 : vimEditor.amplifier;
        
        if(vimEditor.amplifier == 0) {
            vimEditor.callStatusCallback();
        }
        
        if(potential.length > 0) {
            this.lastKeys += key;
            this.lastKeyPress = currentTime;
        }
        
        if(trigger.length > 0) {
            this.lastKeys = "";
            event.preventDefault();
        }
    
        if(currentMode & SFVimMode.NORMAL) {
            event.preventDefault();
        }
    }
}