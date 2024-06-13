import BaseElement from './baseElement.js';

/**
 * Класс для работы с кнопками.
 */
class Button extends BaseElement {
    /**
     * Создает экземпляр Button.
     * @param {string} locator - Локатор элемента.
     * @param {string} name - Имя элемента.
     * @param {BaseElement} [parent=null] - Родительский элемент, если есть.
     */
    constructor(locator, name, parent = null) {
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
