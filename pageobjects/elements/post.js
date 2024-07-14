import Comment from './comment.js';
import BaseElement from "../../framework/elements/baseElement.js";
import Label from "../../framework/elements/label.js";
import Button from "../../framework/elements/button.js";
import common from "../../utils/common.js";

/**
 * Пост на стене.
 */
class Post extends BaseElement {
    /**
     * Поле с текстом поста.
     * @type {Label}
     */
    #textLabel = new Label('.wall_post_text', 'Текст поста', this);

    /**
     * Поле с аватаром автора поста.
     * @type {Label}
     */
    #avatarLabel = new Label('a.AvatarRich.PostHeader__avatar', 'Аватар автора поста', this);

    /**
     * Поле с фотографией поста.
     * @type {Label}
     */
    #photoLabel = new Label('a.page_post_thumb_wrap', 'Фото поста', this);

    /**
     * Кнопка "Показать следующие комментарии".
     * @type {Button}
     */
    #showNextCommentButton = new Button('.js-replies_next_label', 'Показать следующие комментарии', this);

    /**
     * Кнопка "Лайк".
     * @type {Button}
     */
    #likeButton = new Button('.PostBottomAction.PostBottomAction--withBg.PostButtonReactions.PostButtonReactions--post.PostBottomAction--empty',
        'Кнопка "Лайк"', this);

    /**
     * Кнопка "Убрать лайк".
     * @type {Button}
     */
    #unlikeButton = new Button('.PostBottomAction.PostBottomAction--withBg.PostButtonReactions.PostButtonReactions--post.PostButtonReactions--icon-active.PostButtonReactions--active',
        'Кнопка "Убрать лайк"', this);

    /**
     * Кнопка "Комментарии".
     * @type {Button}
     */
    #showCommentsButton = new Button('.PostBottomAction.PostBottomAction--withBg.comment._comment._reply_wrap',
        'Кнопка "Комментарии"', this)

    /**
     * Создает экземпляр Post.
     * @param {string} locator - Локатор поста.
     * @param {BaseElement} parent - Родительский элемент, если есть.
     */
    constructor(locator, parent) {
        super(locator, 'Пост', parent);
    }

    /**
     * Получает текст.
     * @returns {Promise<string>} Текст.
     */
    async getText() {
        return await this.#textLabel.getText();
    }

    /**
     * Получает автора поста.
     * @returns {Promise<string|null>} Идентификатор автора или null, если идентификатор не найден.
     */
    async getAuthor() {
        let hrefValue = await this.#avatarLabel.getAttribute('href');
        return common.removeIdFromString(hrefValue)
    }

    /**
     * Нажимает на кнопку "Лайк" для поста.
     * @returns {Promise<void>}
     */
    async clickLike() {
        await this.#likeButton.click();
    }

    /**
     * Ожидает, пока кнопка "Убрать лайк" не будет отображена.
     * @returns {Promise<void>}
     */
    async waitForUnlikeDisplayed() {
        await this.#unlikeButton.waitForElementDisplayed();
    }

    /**
     * Получает комментарии к посту.
     * @returns {Promise<Comment[]>} Комментарии к посту.
     */
    async getComments() {
        const replyElements = await (await this._find()).$$('.replies div[id*="post"]');
        const comments = await replyElements.map(async (element) => {
            const id = await element.getAttribute('id');
            return new Comment(`.replies div[id=${id}]`, this);
        });

        return comments;
    }

    /**
     * Ожидает, пока кнопка "Показать следующие комментарии" не будет отображена.
     * @returns {Promise<void>}
     */
    async waitForShowNextCommentButtonDisplayed() {
        await this.#showNextCommentButton.waitForElementDisplayed();
    }

    /**
     * Нажимает на кнопку "Показать следующие комментарии".
     * @returns {Promise<void>}
     */
    async showNextCommentButtonClick() {
        await this.#showNextCommentButton.click()
    }

    /**
     * Ожидает, пока кнопка "Показать следующие комментарии" не исчезнет.
     * @returns {Promise<void>}
     */
    async waitForShowNextCommentButtonHidden() {
        await this.#showCommentsButton.click();
        await this.#showNextCommentButton.waitForElementHidden();
    }

    /**
     * Делает скриншот изображения поста.
     * @param {string} pathToSave Путь для сохранения скриншота.
     * @returns {Promise<void>}
     */
    async saveScreenPhoto(pathToSave) {
        await this.#photoLabel.saveScreen(pathToSave);
    }
}

export default Post;