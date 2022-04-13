import { SFVimEditor, SFVimMode } from "./SFVimEditor";

export abstract class SFVimCommand {
    private _name: string;
    private _description: string;
    private _mode: SFVimMode;

    /**
     * @param name the name which can be used to bind the command 
     * @param description a rough description of the command
     * @param mode the mode / modes in which the command can be executed
     */
    public constructor(name: string, description: string, mode: SFVimMode) {
        this._name = name;
        this._description = description;
        this._mode = mode;
    }

    /**
     * the name which can be used to bind the command
     */
    public get name(): string {
        return this._name;
    }

    /**
     * a rough description of the command
     */
    public get description(): string {
        return this._description;
    }

    /**
     * the mode / modes ni which the command can be executed
     */
    public get mode(): SFVimMode {
        return this._mode;
    }

    /**
     * Gets called everytime the associated key is pressed
     * @param vimEditor the current editor
     * @param amplifier the amplifier that might affect the commands result
     */
    public abstract execute(vimEditor: SFVimEditor, amplifier: number): void;
}