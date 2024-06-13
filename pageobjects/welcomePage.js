import BasePage from "./basePage.js";
import Button from "../framework/elements/button.js";
import TextBox from "../framework/elements/textBox.js";

/**
 * Страница с формой входа.
 */
class WelcomePage extends BasePage {
    /**
     * Поле ввода логина.
     * @type {TextBox}
     */
    loginTextBox = new TextBox('#index_email', 'Поле ввода логина');

    /**
     * Кнопка "Войти".
     * @type {Button}
     */
    signInButton = new Button('button.VkIdForm__signInButton', 'Кнопка "Войти"');

    constructor() {
        super('Добро пожаловать');
    }

    /**
     * Вводит логин и нажимает на кнопку "Войти".
     * @param {string} login - Логин пользователя.
     * @returns {Promise<void>}
     */
    async enterLoginAndSignIn(login) {
        await this.loginTextBox.setValue(login);
        await this.signInButton.click();
    }
}

export default WelcomePage;