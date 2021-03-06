# Change Log

## Release Notes

Notes about all releases.

### 1.0.7

Delete.Line removes necessary line breaks - fixed

Select commands being on character off - fixed

Cursor does not jump on set position - fixed

### 1.0.6

Last character not selected when cursor left of anchor - fixed

Cursor shift when moving up or down in visual mode - fixed

### 1.0.5

Changed default keybinding (commit history for further details)

Jump when reaching selection point in different line - fixed

Offset between fake and real cursor in certain situations (involving tabs) - fixed

Cursor Jitter when selecting in visual mode - fixed

InsertAppendLine not working - fixed

### 1.0.4

Fixed bug that did not allow for the deletion of the last line (in special cases)

Fixed cursor display bug when selecting empty lines

Inline search will not jump to before searched line anymore

View will now automatically scroll horizontally

Filled CHANGELOG.md

### 1.0.3

Emergency update to remove code that manipulated that clipboard.

### 1.0.2

Removed bug that made the navigation not save the last character position.

Tabsize will not automatically be resolved.

Cursor will switch according to the mode of the editor (even after document change).

Added new setting `sfvim.saveOnNormalModeSwitch`, it allows the user to save as soon as a switch to normal mode occured.

### 1.0.1

The cursor will now jump to the next occurance instead of the first when using the inline search command.

Commands are ignored that are not part of the current mode.

### 1.0.0

Initial release of sfvim