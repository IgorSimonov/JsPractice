import Post from './post.js';
import { $ } from '@wdio/globals';

/**
 * Класс, представляющий стену.
 */
class Wall {
    constructor() {
        this.wallSelector = '.wall_module';
    }

    /**
     * Ждет, пока стена не будет отображена.
     * @param {number} [timeout=10000] - Время ожидания в миллисекундах.
     * @returns {Promise<void>}
     * @throws {Error} Если стена не отображается за указанное время.
     */
    async waitForWallDisplayed(timeout = 10000) {
        try {
            await $(this.wallSelector).waitForDisplayed({
                timeout: timeout,
                timeoutMsg: 'Стена не загрузилась за 10 сек!'
            });
        } catch (error) {
            throw new Error(`Ошибка при ожидании отображения стены: ${error.message}`);
        }
    }

    /**
     * Получает пост по заданному идентификатору.
     * @param {string | number} postId - Идентификатор поста.
     * @returns {Promise<Post>} Найденный пост.
     * @throws {Error} Если пост не найден.
     */
    async getPost(postId) {
        try {
            const postElement = await $(`${this.wallSelector} div[id*="${postId}"]`);
            return new Post(postElement);
        } catch (error) {
            throw new Error(`Не удалось найти пост с ID ${postId}: ${error.message}`);
        }
    }
}

export default new Wall();