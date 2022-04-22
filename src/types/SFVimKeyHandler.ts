import { SFVimEditor } from "./SFVimEditor";

export interface SFVimKeyHandler {

    /**
     * A method that is called everytime a key is pressed
     * @param vimEditor the editor in which the key was pressed
     * @param key the pressed key
     * @returns true if the key press should be canceled and false if not
     */
    handleKey(vimEditor: SFVimEditor, key: string): boolean;
}