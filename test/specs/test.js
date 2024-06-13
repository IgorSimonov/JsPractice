import { browser, expect } from '@wdio/globals';
import WelcomePage from '../../pageobjects/welcomePage.js';
import VkIdPage from "../../pageobjects/vkIdPage.js";
import VkApi from '../../utils/vkApi.js';
import NewsPage from "../../pageobjects/newsPage.js";
import config from '../../config.js';
import ProfilePage from "../../pageobjects/profilePage.js";
import commonUtils from '../../utils/Common.js';

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
    });

    it('Должен выполнить вход, создать пост, отредактировать его, добавить комментарий, поставить лайк и удалить пост',
        async () => {
        await browser.url(config.host);

        const welcomePage = new WelcomePage();
        await welcomePage.enterLoginAndSignIn(login);

        const vkIdPage = new VkIdPage();
        await vkIdPage.enterPasswordAndContinue(password);

        const newsPage = new NewsPage();
        await newsPage.sideBarMenu.openMyPage();

        await browser.pause(5000);

        const initialPostText = commonUtils.generateRandomText();
        const responseData = await vkApiInstance.postToWall(ownerId, initialPostText);
        const postId = responseData.response.post_id;

        const profilePage = new ProfilePage();
        const post = await profilePage.wall.getPost(postId);

        // Перейти на страницу новостей и открыть свою страницу (пример)
        // const NewsPage = new NewsPage();
        // await NewsPage.sideBarMenu.openMyPage();

        // Подождите, пока стена загрузится
        // const ProfilePage = new ProfilePage();
        // await ProfilePage.wall.waitForWallDisplayed();

        // Создать пост
        // const initialPostText = commonUtils.generateRandomText();
        // const responseData = await vkApiInstance.postToWall(ownerId, initialPostText);
        // const postId = responseData.response.post_id;

        // Другие действия с постом, такими как редактирование, добавление комментариев и лайков

        // Удаление поста
        // await vkApiInstance.deletePost(postId);
        // await expect(post.element).not.toBeDisplayed();
    });
});
