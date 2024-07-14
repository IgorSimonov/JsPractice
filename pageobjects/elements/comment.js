import BaseElement from "../../framework/elements/baseElement.js";
import Label from "../../framework/elements/label.js";

/**
 * Комментарий поста.
 */
class Comment extends BaseElement {
    /**
     * Поле с текстом комментария.
     * @type {Label}
     */
    #textLabel = new Label('.reply_text', 'Текст комментария', this);

    /**
     * Поле с автором комментария.
     * @type {Label}
     */
    #authorLabel = new Label('.author.author_highlighted', 'Автор комментария', this);

    /**
     * Создает экземпляр Comment.
     * @param {string} locator - Локатор комментария.
     * @param {BaseElement} parent - Родительский элемент, если есть.
     */
    constructor(locator, parent) {
        super(locator, 'Комментарий', parent);
    }

    /**
     * Получает текст комментария.
     * @returns {Promise<string>} Текст комментария.
     */
    async getText() {
        return await this.#textLabel.getText();
    }

    /**
     * Получает идентификатор автора комментария.
     * @returns {Promise<string|null>} Идентификатор автора или null, если идентификатор не найден.
     */
    async getAuthor() {
        return await this.#authorLabel.getAttribute('data-from-id');
    }
}

export default Comment;