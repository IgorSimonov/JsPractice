import BaseElement from './baseElement.js';

/**
 * Класс для работы с текстовыми полями на странице.
 */
class TextBox extends BaseElement {
    /**
     * Создает экземпляр Input.
     * @param {string} locator - Локатор элемента.
     * @param {string} name - Имя элемента.
     * @param {BaseElement} [parent=null] - Родительский элемент, если есть.
     */
    constructor(locator, name, parent = null) {
        super(locator, name, parent);
    }

    /**
     * Вводит текст в поле ввода, очищая текущее значение.
     * @param {string} text - Текст для ввода.
     * @returns {Promise<void>}
     */
    async setValue(text) {
        const element = await this._find();
        await element.setValue(text);
    }

    /**
     * Добавляет текст в поле ввода, не очищая текущее значение.
     * @param {string} text - Текст для добавления.
     * @returns {Promise<void>}
     */
    async addValue(text) {
        const element = await this._find();
        await element.addValue(text);
    }

    /**
     * Очищает поле ввода.
     * @returns {Promise<void>}
     */
    async clear() {
        const element = await this._find();
        await element.clearValue();
    }

    /**
     * Получает значение из поля ввода.
     * @returns {Promise<string>} Значение поля ввода.
     */
    async getValue() {
        const element = await this._find();
        return await element.getValue();
    }
}

export default TextBox;
