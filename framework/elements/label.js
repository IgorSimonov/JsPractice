import BaseElement from './baseElement.js';

/**
 * Класс для работы с текстовыми элементами на странице.
 */
class Label extends BaseElement {
    /**
     * Создает экземпляр Label.
     * @param {string} locator - Локатор элемента.
     * @param {string} name - Имя элемента.
     * @param {BaseElement} parent - Родительский элемент, если есть.
     */
    constructor(locator, name, parent) {
        super(locator, name, parent);
    }
}

export default Label;