import { SFVimCommand } from "../types/SFVimCommand";
import { SFVimEditor } from "../types/SFVimEditor";
import { executeMotionJump } from "./motionJump.command";

export function executeMotionTop(vimEditor: SFVimEditor, amplifier: number) {
    if(amplifier != 0) {
        return;
    }

    executeMotionJump(vimEditor, 1);
}

export class CommandMotionTop extends SFVimCommand {
    constructor() {
        super("motion.top", "s");
    }

    public get instance(): SFVimCommand {
        return new CommandMotionTop();
    }

    public execute(vimEditor: SFVimEditor, amplifier: number): void {
        throw new Error("Method not implemented.");
    }
}