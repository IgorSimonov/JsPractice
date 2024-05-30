import { browser, expect } from '@wdio/globals';
import LoginPage from '../../pageobjects/loginPage.js';
import commonUtils from '../../utils/Common.js';
import vk from '../../utils/vkApi.js';
import ProfilePage from '../../pageobjects/profilePage.js';
import NewsPage from '../../pageobjects/newsPage.js';
import config from '../../config.js';

describe('ВКонтакте: вход, управление и взаимодействие с постами', () => {
    let accessToken;
    let ownerId;
    let login;
    let password;
    let VkApi;

    before(() => {
        accessToken = process.env.ACCESS_TOKEN;
        ownerId = process.env.USER_ID;
        login = process.env.LOGIN;
        password = process.env.PASSWORD;

        if (!accessToken || !ownerId || !login || !password) {
            throw new Error('Отсутствуют одна или несколько необходимых переменных окружения!');
        }

        VkApi = new vk(accessToken);
    });

    it('Должен выполнить вход, создать пост, отредактировать его, добавить комментарий, поставить лайк ' +
        'и удалить пост', async () => {
        await browser.url(config.host);
        await LoginPage.switchLanguage(config.language);

        await LoginPage.authorization(login, password);
        await NewsPage.sideBarMenu.openMyPage();

        await ProfilePage.wall.waitForWallDisplayed();

        const initialPostText = commonUtils.generateRandomText();
        const responseData = await VkApi.postToWall(ownerId, initialPostText);
        const postId = responseData.response.post_id;

        let post = await ProfilePage.wall.getPost(postId);
        await post.element.scrollIntoView();
        await expect(await post.getText()).toEqual(initialPostText);
        await expect(await post.getAuthor()).toEqual(ownerId);

        const updatedPostText = commonUtils.generateRandomText();
        await VkApi.editWallPostWithUploadedPhoto(config.photoPath, postId, updatedPostText);
        await post.saveScreenPhoto(config.savePostPhotoPath);
        let result = await commonUtils.compareImages(config.photoPath, config.savePostPhotoPath)
        await expect(result.isSameDimensions).toBe(true);
        await expect(await post.getText()).toEqual(updatedPostText);

        const commentText = commonUtils.generateRandomText();
        await VkApi.createPostComment(postId, commentText);
        const postComments = await post.getComments();
        const hasMatchingComment = postComments.some(async (comment) => {
            return (await comment.getAuthor()) === ownerId && (await comment.getText()) === commentText;
        });
        await expect(hasMatchingComment).toBe(true);

        await post.clickLike();
        const likeResponse = await VkApi.getPostLikes(postId);
        await expect(likeResponse.response.items).toContain(parseInt(ownerId));

        await VkApi.deletePost(postId);
        await expect(post.element).not.toBeDisplayed();
    });
});
