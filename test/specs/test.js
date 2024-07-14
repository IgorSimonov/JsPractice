import { browser, expect } from '@wdio/globals';
import WelcomePage from '../../pageobjects/welcomePage.js';
import VkIdPage from "../../pageobjects/vkIdPage.js";
import VkApi from '../../vk-api-utils/vkApi.js';
import NewsPage from "../../pageobjects/newsPage.js";
import config from '../../config.js';
import ProfilePage from "../../pageobjects/profilePage.js";
import compareUtils from '../../utils/compareUtils.js';
import randomUtils from "../../utils/randomUtils.js";
import fs from 'fs/promises';
import { step } from '@wdio/allure-reporter';

describe('ВКонтакте: вход, управление и взаимодействие с постами', () => {
    let accessToken;
    let ownerId;
    let login;
    let password;
    let vkApiInstance;

    before(async () => {
        accessToken = process.env.ACCESS_TOKEN;
        ownerId = process.env.USER_ID;
        login = process.env.LOGIN;
        password = process.env.PASSWORD;

        if (!accessToken || !ownerId || !login || !password) {
            throw new Error('Отсутствуют одна или несколько необходимых переменных окружения!');
        }

        vkApiInstance = new VkApi(accessToken);

        try {
            await fs.access(config.savePostPhotoPath);
            await fs.unlink(config.savePostPhotoPath);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
    });

    it('Должен выполнить вход, создать пост, отредактировать его, добавить комментарий, поставить лайк и удалить пост', async () => {
        await step(`Шаг 1. [UI] Перейти на ${config.host}`, async () => {
            await browser.url(config.host);
        });

        await step(`Шаг 2. [UI] Авторизоваться`, async () => {
            const welcomePage = new WelcomePage();
            await welcomePage.enterLoginAndSignIn(login);

            const vkIdPage = new VkIdPage();
            await vkIdPage.enterPasswordAndContinue(password);
        });

        const profilePage = new ProfilePage();

        await step(`Шаг 3. [UI] Перейти на "Мою страницу"`, async () => {
            const newsPage = new NewsPage();
            await newsPage.sideBarMenu.openMyPage();

            await profilePage.wall.waitForElementDisplayed();
        });

        const initialPostText = randomUtils.generateRandomText();
        let postId;

        await step(`Шаг 4. [API] Создать запись на стене`, async () => {
            const responseData = await vkApiInstance.postToWall(ownerId, initialPostText);
            postId = responseData.response.post_id;
        });

        let post;

        await step(`Шаг 5. [UI] Проверить созданную запись`, async () => {
            post = await profilePage.wall.getPost(postId);
            await post.scrollIntoView();
            await expect(await post.getText()).toEqual(initialPostText);
            await expect(await post.getAuthor()).toEqual(ownerId);
        });

        const updatedPostText = randomUtils.generateRandomText();

        await step(`Шаг 6. [API] Отредактировать запись на стене`, async () => {
            await vkApiInstance.editWallPostWithUploadedPhoto(config.photoPath, ownerId, postId, updatedPostText);
        });

        await step(`Шаг 7. [UI] Проверить отредактированную запись`, async () => {
            await post.saveScreenPhoto(config.savePostPhotoPath);
            const compareImagesResult = await compareUtils.compareImages(config.photoPath, config.savePostPhotoPath);
            await expect(compareImagesResult.isSameDimensions).toBe(true);
            await expect(await post.getText()).toEqual(updatedPostText);
        });

        const commentText = randomUtils.generateRandomText();

        await step(`Шаг 8. [API] Добавить комментарий к записи`, async () => {
            await vkApiInstance.createPostComment(postId, commentText);
        });

        await step(`Шаг 9. [UI] Проверить добавленный комментарий`, async () => {
            await post.waitForShowNextCommentButtonDisplayed();
            await post.showNextCommentButtonClick();
            await post.waitForShowNextCommentButtonHidden();
            const postComments = await post.getComments();

            let hasMatchingComment = false;

            for (const comment of postComments) {
                const author = await comment.getAuthor();
                const text = await comment.getText();
                if (author === ownerId && text === commentText) {
                    hasMatchingComment = true;
                    break;
                }
            }
            await expect(hasMatchingComment).toBe(true);
        });

        await step(`Шаг 10. [UI] Поставить лайк к записи`, async () => {
            await post.clickLike();
        });

        await step(`Шаг 11. [API] Проверить, что лайк был поставлен`, async () => {
            await post.waitForUnlikeDisplayed();
            const likeResponse = await vkApiInstance.getPostLikes(postId);
            await expect(likeResponse.response.items).toContain(parseInt(ownerId));
        });

        await step(`Шаг 12. [API] Удалить созданную запись`, async () => {
            await vkApiInstance.deletePost(postId);
        });

        await step(`Шаг 13. [UI] Проверить, что запись удалена`, async () => {
            await post.waitForElementHidden();
            await expect(await post.isDisplayed()).toBe(false);
        });
    });
});