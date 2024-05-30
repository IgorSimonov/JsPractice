import Comment from './comment.js';
import { browser } from '@wdio/globals';

/**
 * Пост на стене.
 */
class Post {
    /**
     * Создает новый экземпляр поста.
     * @param {WebdriverIO.Element} element - Элемент, представляющий пост.
     */
    constructor(element) {
        this.element = element;
    }

    /**
     * Получает текст поста.
     * @returns {Promise<string>} Текст поста.
     */
    async getText() {
        return await this.element.$('.wall_post_text').getText();
    }

    /**
     * Получает автора поста.
     * @returns {Promise<string|null>} Идентификатор автора или null, если идентификатор не найден.
     */
    async getAuthor() {
        // Попытка получить автора поста, если пост не новый.
        let attribute = await this.element.getAttribute('data-post-author-id');

        if (!attribute) {
            // Если пост только что добавлен, пытаемя получить id из ссылки.
            let hrefValue = await this.element.$('a.AvatarRich').getAttribute('href');
            attribute = hrefValue.replace('/id', '');
        }

        return attribute;
    }

    /**
     * Нажимает на кнопку "Лайк" для поста.
     * @returns {Promise<void>}
     */
    async clickLike() {
        await this.element.$('.PostBottomActionContainer.PostButtonReactionsContainer').click();

        // Ожидание, чтобы после клика, в ответ API попал поставленый лайк.
        await browser.pause(1000);
    }

    /**
     * Получает комментарии к посту.
     * @returns {Promise<Comment[]>} Комментарии к посту.
     */
    async getComments() {
        const nextComments = await this.element.$('.js-replies_next_label.replies_next_label');

        // Ждем, пока кнопка "следующие комментарии" станет доступной.
        await browser.pause(1000);

        if (await nextComments.isExisting()) {
            await nextComments.click();

            // Ждем появления комментариев.
            await browser.pause(1000);
        }

        const replyElements = await this.element.$$('.replies div[id*="post"]');
        const comments = await Promise.all(await replyElements
            .map(async (element) => new Comment(element)));

        return comments;
    }

    /**
     * Делает скриншот изображения поста.
     * @param {string} pathToSave Путь для сохранения скриншота.
     * @returns {Promise<void>}
     */
    async saveScreenPhoto(pathToSave) {
        let postPhoto = await this.element.$('a[aria-label="photo"]');

        if (await postPhoto.isExisting()){
            await postPhoto.saveScreenshot(pathToSave);
        }
    }
}

export default Post;
