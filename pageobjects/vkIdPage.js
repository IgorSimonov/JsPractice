import BasePage from "./basePage.js";
import Button from "../framework/elements/button.js";
import TextBox from "../framework/elements/textBox.js";

/**
 * Страница ввода пароля для VK ID.
 */
class VkIdPage extends BasePage {
    /**
     * Поле ввода пароля.
     * @type {TextBox}
     */
    #passwordTextBox = new TextBox('input[name=password]', 'Поле ввода пароля');

    /**
     * Кнопка "Продолжить".
     * @type {Button}
     */
    #continueButton = new Button('button[type=submit]', 'Кнопка "Продолжить"');

    constructor() {
        super('VK ID');
    }

    /**
     * Вводит пароль и нажимает на кнопку "Продолжить".
     * @param {string} password - Пароль пользователя.
     * @returns {Promise<void>}
     */
    async enterPasswordAndContinue(password) {
        await this.#passwordTextBox.setValue(password);
        await this.#continueButton.click();
    }
}

export default VkIdPage;