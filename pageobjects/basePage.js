/**
 * Базовый класс для страниц.
 */
class BasePage {
    /**
     * Имя страницы.
     * @type {string}
     */
    #name;

    /**
     * Создает экземпляр BasePage с указанным именем.
     * @param {string} name - Имя страницы.
     */
    constructor(name) {
        this.#name = name;
    }

    /**
     * Получает имя страницы.
     * @returns {string} Имя страницы.
     */
    get name() {
        return this.#name;
    }
}

export default BasePage;