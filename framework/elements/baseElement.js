import { $ } from '@wdio/globals';

/**
 * Базовый класс для работы с элементами на странице.
 */
class BaseElement {
    /**
     * Создает экземпляр BaseElement.
     * @param {string} locator - Локатор элемента.
     * @param {string} name - Имя элемента.
     * @param {BaseElement} parent - Родительский элемент, если есть.
     */
    constructor(locator, name, parent) {
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
     */
    async _find() {
        if (this._parent) {
            const parentElement = await this._parent._find();
            return parentElement.$(this._locator);
        }
        return await $(this._locator);
    }

    /**
     * Ожидает, пока элемент не будет отображен на странице.
     * @param {number} [timeout=10000] - Время ожидания в миллисекундах. По умолчанию 10000 мс.
     * @returns {Promise<void>}
     */
    async waitForElementDisplayed(timeout = 10000) {
        const element = await this._find();
        await element.waitForDisplayed({
            timeout: timeout,
            timeoutMsg: `Элемент ${this.name} не отобразился за ${timeout} мс!`
        });
    }

    /**
     * Ожидает, пока элемент не исчезнет со страницы.
     * @param {number} [timeout=10000] - Время ожидания в миллисекундах. По умолчанию 10000 мс.
     * @returns {Promise<void>}
     */
    async waitForElementHidden(timeout = 10000) {
        const element = await this._find();
        await element.waitForDisplayed({
            reverse: true,
            timeout: timeout,
            timeoutMsg: `Элемент ${this.name} все еще отображается после ${timeout} мс!`,
            interval: 1000,
        });
    }

    /**
     * Проверяет, отображается ли элемент.
     * @returns {Promise<boolean>} true, если элемент отображается, иначе false.
     */
    async isDisplayed() {
        const element = await this._find();
        return await element.isDisplayed();
    }

    /**
     * Возвращает текст элемента.
     * @returns {Promise<string>} Текст элемента.
     */
    async getText() {
        const element = await this._find();
        return await element.getText();
    }

    /**
     * Прокручивает страницу к элементу.
     * @returns {Promise<void>}
     */
    async scrollIntoView() {
        const element = await this._find();
        await element.scrollIntoView();
    }

    /**
     * Сохраняет скриншот элемента.
     * @param {string} pathToSave - Путь для сохранения скриншота.
     * @returns {Promise<void>}
     */
    async saveScreen(pathToSave) {
        const element = await this._find();
        await element.saveScreenshot(pathToSave);
    }

    /**
     * Возвращает значение атрибута элемента.
     * @param {string} name - Имя атрибута.
     * @returns {Promise<string>} Значение атрибута.
     */
    async getAttribute(name) {
        const element = await this._find();
        return await element.getAttribute(name);
    }
}

export default BaseElement;