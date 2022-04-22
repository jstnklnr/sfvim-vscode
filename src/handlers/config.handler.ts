import * as vscode from "vscode";

export class SFVimConfigHandler {
    private static _instance: SFVimConfigHandler;
    private configs: Map<string, vscode.WorkspaceConfiguration>;

    public constructor(context: vscode.ExtensionContext, ...configs: Array<string>) {
        this.configs = new Map<string, vscode.WorkspaceConfiguration>();

        for(let config of configs) {
            this.configs.set(config, {} as unknown as vscode.WorkspaceConfiguration);
        }

        this.loadConfigs();
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => this.loadConfigs()));
        SFVimConfigHandler._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): SFVimConfigHandler {
        return SFVimConfigHandler._instance || undefined as unknown as SFVimConfigHandler; //Very dangerous
    }

    /**
     * Loads all requested configs
     */
    private loadConfigs() {
        for(let configName of this.configs.keys()) {
            const config = this.getConfig(configName)!;

            for(let key of Object.keys(config)) {
                delete (config as unknown as any)[key];
            }

            Object.assign(config, vscode.workspace.getConfiguration(configName));
        }
    }

    /**
     * Returns the config with the given name
     * @param name the name of the config
     * @returns the config corrosponding to that name
     */
    public getConfig(name: string): vscode.WorkspaceConfiguration | undefined {
        return this.configs.get(name);
    }
}