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

> Default bind: e

#### mode.append

> Switches the current editor to INSERT mode and puts the cursor behind the currently selected character

> Default bind: a

#### mode.appendLineEnd

> Switches the current editor to INSERT mode and puts the cursor at the end of the line

> Default bind: A

#### mode.insertLineStart

> Switches the current editor to INSERT mode and puts the cursor in front of the first character of the line

> Default bind: E

#### mode.normal

> Switches the current editor mode to NORMAL

> Default bind: qq

#### mode.visual

> Toggles between visual and normal mode

> Default bind: v

#### motion.bottom

> Moves the cursor to the bottom of the document

> Default bind: G

#### motion.down

> Moves the cursor to the line below

> Default bind: k

#### motion.highestView

> Moves the cursor to the highest line of the current viewport

> Default bind: hh

#### motion.jump

> Jumps to the beginning of specified line

> Default bind: G

#### motion.left

> Moves the cursor to the character to the left

> Default bind: j

#### motion.lineEnd

> Moves the cursor to the last character of the line

> Default bind: L

#### motion.lineStart

> Moves the cursor to the first character of the line

> Default bind: J

#### motion.lowestView

> Moves the cursor to the lowest line of the current viewport

> Default bind: H

#### motion.middleView

> Moves the cursor to the middle line of the current viewport

> Default bind: h

#### motion.nextEmptyLine

> Moves the cursor to the next empty line

> Default bind: K

#### motion.previousEmptyLine

> Moves the cursor to the previous empty line

> Default bind: I

#### motion.realLineEnd

> Moves the cursor to the end of the line

> Default bind: $

#### motion.realLineStart

> Moves the cursor to the start of the line

> Default bind: ^

#### motion.right

> Moves the cursor to the character to the right

> Default bind: l

#### motion.scrollHalfPageDown

> Moves the cursor half a page up and will set the scroll view to the cursor

> Default bind: (

#### motion.scrollHalfPageUp

> Moves the cursor to the bottom of the document

> Default bind: )

#### motion.skipEndLeft

> Moves the cursor to the end of the previous word

> Default bind: gs

#### motion.skipEndLeftSpecial

> Moves the cursor to the end of the previous word (including special characters)

> Default bind: gS

#### motion.skipEndRight

> Moves the cursor to the end of the next word

> Default bind: gf

#### motion.skipEndRightSpecial

> Moves the cursor to the end of the next word (including special characters)

> Default bind: gF

#### motion.skipLeft

> Moves the cursor to the beginning of the previous word

> Default bind: s

#### motion.skipEndSpecial

> Moves the cursor to the beginning of the previous word (including special characters)

> Default bind: undefined

#### motion.skipRight

> Moves the cursor to the beginning of the next word

> Default bind: f

#### motion.skipRightSpecial

> Moves the cursor to the beginning of the next word (including special characters)

> Default bind: F

#### motion.top

> Moves the cursor to the top of the document

> Default bind: gg

#### motion.up

> Moves the cursor to the line above

> Default bind: i

#### selection.swap

> Swaps the anchor position with the active position

> Default bind: V

#### select.specialWord

> Selects the word that is currently under the cursor

> Default bind: VW

#### select.untilNextWord

> Selects all characters from the current to the next occuring word

> Default bind: Vf

#### select.untilNextSpecialWord

> Selects all characters from the current to the next occuring word (including special characters)

> Default bind: VF

#### select.untilPreviousWord

> Selects all characters from the current to the previous occuring word

> Default bind: Vs

#### select.untilPreviousSpecialWord

> Selects all characters from the current to the previous occuring word (including special characters)

> Default bind: VS

#### select.word

> Selects the word that is currently under the cursor

> Default bind: Vw

#### line.addAbove

> Adds a line above the current line

> Default bind: N

#### line.addBelow

> Adds a line below the current line

> Default bind: n

#### tab.add

> Adds a tab at the start of the line

> Default bind: >>

#### redo

> Redoes the last undone action

> Default bind: U

#### tab.remove

> Removes a tab at the start of the line

> Default bind: <<

#### replace

> Replaces the current character with the next pressed key

> Default bind: r

#### replace.insert

> Deletes all selected characters and switches to insert mode

> Default bind: R

#### line.moveDown

> Shifts the selected lines down

> Default bind: '

#### line.moveUp

> Shifts the selected lines up

> Default bind: [

#### suggestion

> Shows a list of suggested actions

> Default bind: |

#### undo

> Undoes the last action

> Default bind: u

#### copy

> Copies the highlighted text

> Default bind: gy

#### copy.line

> Copies the current line

> Default bind: yl

#### line.copyDown

> Copies the selected lines down

> Default bind: "

#### copy.moveFirst

> Copies the highlighted text and jumps to first selected character

> Default bind: y

#### copy.moveLast

> Copies the highlighted text and jumps to the last selected character

> Default bind: Y

#### copy.specialWord

> Copies all characters of the current word (including special characters)

> Default bind: yW

#### copy.untilNextWord

> Copies all characters from the current to the next occurring word

> Default bind: yf

#### copy.untilNextSpecialWord

> Copies all characters from the current to the next occurring word (including special characters)

> Default bind: yF

#### copy.untilPreviousWord

> Copies all characters from the current to the previous occurring word

> Default bind: ys

#### copy.untilPreviousSpecialWord

> Copies all characters from the current to the previous occurring word (including special characters)

> Default bind: yS

#### copy.word

> Copies all characters of the current word

> Default bind: yw

#### cut

> Cuts the highligted text

> Default bind: c

#### cut.line

> Cuts the current line

> Default bind: cl

#### cut.specialWord

> Cuts all characters of the current word (including special characters)

> Default bind: cW

#### cut.untilNextWord

> Cuts all characters from the current to the next occurring word

> Default bind: cf

#### cut.untilNextSpecialWord

> Cuts all characters from the current to the next occurring word (including special characters)

> Default bind: cF

#### cut.untilPreviousWord

> Cuts all characters from the current to the previous occurring word

> Default bind: cs

#### cut.untilPreviousSpecialWord

> Cuts all characters from the current to the previous occurring word (including special characters)

> Default bind: cS

#### cut.word

> Cuts all characters of the current word

> Default bind: cw

#### paste.before

> Paste the content of the clipboard in front of the cursor

> Default bind: p

#### paste.beforeMoveBehind

> Paste the content of the clipboard in front of the cursor, and move behind the pasted text

> Default bind: gp

#### paste.behind

> Paste the content of the clipboard behind the cursor

> Default bind: P

#### paste.behindMoveBehind

> Paste the content of the clipboard behind the cursor, and move behind the pasted text

> Default bind: gP

#### paste.replace

> Replace the currently selected text with the contents of the clipboard

> Default bind: p

#### paste.replaceMoveBehind

> Replace the currently selected text with the contents of the clipboard, and move behind the pasted text

> Default bind: P

#### delete

> Deletes the currently selected text

> Default bind: d

#### delete.character

> Deletes the characters that is currently under the cursor

> Default bind: q

#### delete.characterMoveLeft

> Deletes the characters that is currently under the cursor and moves one character to the left

> Default bind: Q

#### delete.line

> Deletes the current line

> Default bind: dl

#### delete.rightCharacter

> Deletes the characters that is next to the cursor (right side)

> Default bind: gq

#### delete.specialWord

> Deletes the word that is currently under the cursor (including special characters)

> Default bind: dW

#### delete.untilNextWord

> Deletes all characters from the current to the next occuring word

> Default bind: df

#### delete.untilNextSpecialWord

> Deletes all characters from the current to the next occuring word (including special characters)

> Default bind: dF

#### delete.untilPreviousWord

> Deletes all characters from the current to the previous occuring word

> Default bind: ds

#### delete.untilPreviousSpecialWord

> Deletes all characters from the current to the previous occuring word (including special characters)

> Default bind: dS

#### delete.word

> Deletes the word that is currently under the cursor

> Default bind: dw

#### search.inline

> Searches the pressed key in the current line

> Default bind: t

#### search.nextOccurance

> Moves the cursor to the next occurance of the last search

> Default bind: .

#### search.previousOccurance

> Moves the cursor to the previous occurance of the last search

> Default bind: ,

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

- Undoing or redoing might result and adding the `mode.normal` bind keys.
- Keys like ctrl, cmd, alt or option cannot be used for keybinding.

## Release Notes

Notes about all releases.

### 1.0.1

The cursor will now jump to the next occurance instead of the first when using the inline search command.

Commands are ignored that are not part of the current mode.

### 1.0.0

Initial release of sfvim