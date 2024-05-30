/**
 * Комментарий поста.
 */
class Comment {
    /**
     * Создает новый экземпляр комментария.
     * @param {WebdriverIO.Element} element - Элемент, представляющий комментарий.
     */
    constructor(element) {
        this.element = element;
    }

    /**
     * Получает текст комментария.
     * @returns {Promise<string>} Текст комментария.
     */
    async getText() {
        return await this.element.$('.reply_text').getText();
    }

    /**
     * Получает идентификатор автора комментария.
     * @returns {Promise<string|null>} Идентификатор автора или null, если идентификатор не найден.
     */
    async getAuthor() {
        return await this.element.getAttribute('data-answering-id');
    }
}

export default Comment;
