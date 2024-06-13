import BaseElement from './baseElement.js';

/**
 * Класс для работы с текстовыми элементами на странице.
 */
class Label extends BaseElement {
    /**
     * Создает экземпляр Label.
     * @param {string} locator - Локатор элемента.
     * @param {string} name - Имя элемента.
     * @param {BaseElement} [parent=null] - Родительский элемент, если есть.
     */
    constructor(locator, name, parent = null) {
        super(locator, name, parent);
    }

    /**
     * Получает текст.
     * @returns {Promise<string>} Текст.
     */
    async getText() {
        const element = await this._find();
        return await element.getText();
    }
}

export default Label;
