import { $ } from '@wdio/globals';

/**
 * Базовый класс для работы с элементами на странице.
 */
class BaseElement {
    /**
     * Создает экземпляр BaseElement.
     * @param {string} locator - Локатор элемента.
     * @param {string} name - Имя элемента.
     * @param {BaseElement} [parent=null] - Родительский элемент, если есть.
     */
    constructor(locator, name, parent = null) {
        this._locator = locator;
        this._name = name;
        this._parent = parent;
    }

    /**
     * Возвращает имя элемента.
     * @returns {string} Имя элемента.
     */
    get name() {
        return this._name;
    }

    /**
     * Возвращает локатор элемента.
     * @returns {string} Локатор элемента.
     */
    get locator() {
        return this._locator;
    }

    /**
     * Ищет элемент на странице.
     * @returns {Promise<WebdriverIO.Element>} Найденный элемент.
     * @throws {Error} Если элемент не найден.
     */
    async _find() {
        if (this._parent) {
            const parentElement = await this._parent._find();
            return parentElement.$(this._locator);
        }
        return await $(this._locator);
    }

    /**
     * Проверяет, отображается ли элемент.
     * @returns {Promise<boolean>} true, если элемент отображается, иначе false.
     */
    async isDisplayed() {
        const element = await this._find();
        return await element.isDisplayed();
    }

    async getText(){
        const element = await this._find();
        return await element.getText();
    }
}

export default BaseElement;
