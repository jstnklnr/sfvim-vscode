import { WorkspaceConfiguration } from "vscode";
import { ConfigHandler, SFVimConfigManager } from "./config.handler";
import * as binds from "../keybindings";

export interface Keybinding {
    command: string;
    bind: string;
}

export class SFVimKeybindHandler implements ConfigHandler {
    private _keybindings: Array<Keybinding>;

    constructor() {
        this._keybindings = [];
        this.configChange("sfvim", SFVimConfigManager.instance().getConfig("sfvim")!);
        SFVimConfigManager.instance().registerHandler(this);
    }

    configChange(configName: string, config: WorkspaceConfiguration): void {
        if(configName != "sfvim") {
            return;
        }

        const configBinds = config.get("keybindings") as Array<Keybinding>;
        this._keybindings = [...binds.defaultBindings];
        this._keybindings = this._keybindings.map(bind => configBinds.find(b => bind.command === b.command) || bind);
    }

    /**
     * List of all keybindings
     */
    public get keybindings() {
        return this._keybindings;
    }
}