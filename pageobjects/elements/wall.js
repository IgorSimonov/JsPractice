import Post from './post.js';
import BaseElement from "../../framework/elements/baseElement.js";

/**
 * Стена.
 */
class Wall extends BaseElement {
    /**
     * Создает экземпляр Wall.
     */
    constructor() {
        super('#page_wall_posts', 'Стена');
    }

    /**
     * Получает пост по заданному идентификатору.
     * @param {string | number} postId - Идентификатор поста.
     * @returns {Promise<Post>} Найденный пост.
     */
    async getPost(postId) {
        return new Post(`div[data-post-id*="${postId}"]`, this);
    }
}

export default Wall;