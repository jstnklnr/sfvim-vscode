import * as vscode from "vscode";

export interface ConfigHandler {
    /**
     * Gets called everytime a config has been updated
     * @param configName the name of the updated config
     * @param config the configuration object
     */
    configChange(configName: string, config: vscode.WorkspaceConfiguration): void 
}

export class SFVimConfigManager {
    private static _instance: SFVimConfigManager;
    private configs: Map<string, vscode.WorkspaceConfiguration>;
    private handlers: Array<ConfigHandler>;

    public constructor(context: vscode.ExtensionContext, ...configs: Array<string>) {
        this.configs = new Map<string, vscode.WorkspaceConfiguration>();

        for(let config of configs) {
            this.configs.set(config, {} as unknown as vscode.WorkspaceConfiguration);
        }

        this.handlers = [];
        this.loadConfigs();
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => this.loadConfigs()));
        SFVimConfigManager._instance = this;
    }

    /**
     * @returns the single instance that should exist of this command
     */
    public static instance(): SFVimConfigManager {
        return SFVimConfigManager._instance || undefined as unknown as SFVimConfigManager; //Very dangerous
    }

    /**
     * Registers the given config handler
     * @param handler the handler that should be registered
     */
    public registerHandler(handler: ConfigHandler): void {
        this.handlers.push(handler);
    }

    /**
     * Unregisters the given handler
     * @param handler the handler that should be unregistered
     */
    public unregisterHandler(handler: ConfigHandler): void {
        this.handlers.splice(this.handlers.findIndex(h => h === handler), 1);
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
            
            for(let handler of this.handlers) {
                handler.configChange(configName, config);
            }
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