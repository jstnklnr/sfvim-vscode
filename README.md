# sfvim-vscode README

This vscode extension allows one to move through a document using keybinds.
It is inspired by the original vim, but the default keybindings are much more straightforward.

## Installation

To enable key-repeating on mac you can paste the following commands into your terminal window.

```
$ defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false              # For VS Code
$ defaults write com.microsoft.VSCodeInsiders ApplePressAndHoldEnabled -bool false      # For VS Code Insider
$ defaults write com.visualstudio.code.oss ApplePressAndHoldEnabled -bool false         # For VS Codium
$ defaults write com.microsoft.VSCodeExploration ApplePressAndHoldEnabled -bool false   # For VS Codium Exploration users
$ defaults delete -g ApplePressAndHoldEnabled                                           # If necessary, reset global default
```

## Features

SFVim supports the following commands:
> Note that all of these keybinds can be changed through the extensions settings.

#### mode.insert

> Switches the current editor to INSERT mode and puts the cursor in front of the currently selected character
> Defaultbind: e

## Extension Settings

Keybinds can be set through the `sfvim.keybindings` section in the settings.

A bind looks like this.
```
{
    "command": <command>
    "bind": <bind>
}
```

* If `sfvim.normalModeLineNumbersRelative` is set to true, line numbers will appear as relative when in normal mode.
* Same goes for `sfvim.insertModeLineNumbersRelative`.

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Notes about all releases.

### 1.0.0

Initial release of sfvim