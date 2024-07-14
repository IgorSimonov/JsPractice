import BaseElement from './baseElement.js';

/**
 * Класс для работы с кнопками.
 */
class Button extends BaseElement {
    /**
     * Создает экземпляр Button.
     * @param {string} locator - Локатор элемента.
     * @param {string} name - Имя элемента.
     * @param {BaseElement} parent - Родительский элемент, если есть.
     */
    constructor(locator, name, parent) {
        super(locator, name, parent);
    }

    /**
     * Кликает по элементу.
     * @returns {Promise<void>}
     */
    async click() {
        const element = await this._find();
        await element.click();
    }
}

export default Button;