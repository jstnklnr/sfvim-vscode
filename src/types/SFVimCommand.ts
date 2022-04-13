import { SFVimEditor } from "./SFVimEditor";

export abstract class SFVimCommand {
    private _name: string;
    private _description: string;

    public constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    public abstract get instance(): SFVimCommand;

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public abstract execute(vimEditor: SFVimEditor, amplifier: number): void;
}