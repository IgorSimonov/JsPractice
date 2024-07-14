import fetch from 'node-fetch';
import { FormData } from 'formdata-node';
import { fileFromPathSync } from 'formdata-node/file-from-path';
import API_ENDPOINTS from "./endpoints.js";

const API_BASE_URL = 'https://api.vk.com/method/';
const API_VERSION = '5.131';

/**
 * Класс для взаимодействия с API ВКонтакте версии 5.131.
 * Предоставляет методы для публикации и редактирования постов,
 * загрузки файлов, получения списка лайков и других операций.
 */
class VkApi {
    /**
     * Токен доступа для API ВКонтакте.
     * @type {string}
     */
    #accessToken;

    /**
     * Создает экземпляр VkApi.
     * @param {string} accessToken - Токен доступа для API ВКонтакте.
     */
    constructor(accessToken) {
        if (typeof accessToken !== 'string') {
            throw new Error('Токен доступа должен быть строкой!');
        }

        this.#accessToken = accessToken;
    }

    /**
     * Публикует сообщение на стене.
     * @param {string | number} ownerId - ID владельца стены.
     * @param {string | number} message - Сообщение для публикации.
     * @returns {Promise<Object>} Ответ API.
     */
    async postToWall(ownerId, message) {
        const params = {
            owner_id: ownerId,
            message: message,
        };

        return await this.#request(API_ENDPOINTS.WALL.POST, params);
    }

    /**
     * Редактирует пост на стене.
     * @param {string | number} ownerId - ID владельца стены.
     * @param {string} attachments - Вложения к посту.
     * @param {string | number} postId - ID поста.
     * @param {string | number} message - Новое сообщение.
     * @returns {Promise<Object>} Ответ API.
     */
    async editWall(ownerId, attachments, postId, message) {
        const params = {
            owner_id: ownerId,
            attachments: attachments,
            post_id: postId,
            message: message,
        };

        return await this.#request(API_ENDPOINTS.WALL.EDIT, params);
    }

    /**
     * Удаляет пост со стены.
     * @param {string | number} postId - ID поста.
     * @returns {Promise<Object>} Ответ API.
     */
    async deletePost(postId) {
        const params = {
            post_id: postId,
        };

        return await this.#request(API_ENDPOINTS.WALL.DELETE, params);
    }

    /**
     * Создает комментарий к посту.
     * @param {string | number} postId - ID поста.
     * @param {string | number} message - Сообщение комментария.
     * @returns {Promise<Object>} Ответ API.
     */
    async createPostComment(postId, message) {
        const params = {
            post_id: postId,
            message: message,
        };

        return await this.#request(API_ENDPOINTS.WALL.CREATE_COMMENT, params);
    }

    /**
     * Получает список лайков для поста.
     * @param {string | number} postId - ID поста.
     * @returns {Promise<Object>} Ответ API.
     */
    async getPostLikes(postId) {
        const params = {
            type: 'post',
            item_id: postId,
        };

        return await this.#request(API_ENDPOINTS.LIKES.GET_LIST, params, 'GET');
    }

    /**
     * Редактирует пост на стене с загруженной фотографией.
     * @param {string} photoPath - Путь к фотографии.
     * @param {string | number} ownerId - ID владельца стены.
     * @param {string | number} postId - ID поста.
     * @param {string | number} message - Новое сообщение.
     * @returns {Promise<Object>} Ответ API.
     * @throws Ошибка при редактировании поста.
     */
    async editWallPostWithUploadedPhoto(photoPath, ownerId, postId, message) {
        try {
            const wallUploadServerResponse = await this.getWallUploadServer();
            const uploadFileResponse = await this.uploadFile(wallUploadServerResponse.response.upload_url, photoPath);
            const saveWallPhotoResponse = await this.saveWallPhoto(uploadFileResponse.server, uploadFileResponse.photo, uploadFileResponse.hash);

            return await this.editWall(
                ownerId,
                `photo${saveWallPhotoResponse.response[0].owner_id}_${saveWallPhotoResponse.response[0].id}`,
                postId,
                message,
            );
        } catch (error) {
            throw new Error(`Ошибка при редактировании поста: ${error.message}`);
        }
    }

    /**
     * Получает URL сервера для загрузки фотографий на стену.
     * @returns {Promise<Object>} Ответ API с URL сервера загрузки.
     */
    async getWallUploadServer() {
        const params = {};

        return await this.#request(API_ENDPOINTS.PHOTOS.GET_WALL_UPLOAD_SERVER, params, 'GET');
    }

    /**
     * Сохраняет фотографию на стене.
     * @param {string} server - Сервер загрузки.
     * @param {string} photo - Фотография.
     * @param {string} hash - Хэш фотографии.
     * @returns {Promise<Object>} Ответ API.
     */
    async saveWallPhoto(server, photo, hash) {
        const params = {
            server: server,
            photo: photo,
            hash: hash,
        };

        return await this.#request(API_ENDPOINTS.PHOTOS.SAVE_WALL_PHOTO, params);
    }

    /**
     * Загружает файл на указанный URL.
     * @param {string} url - URL для загрузки файла.
     * @param {string} pathToFile - Путь к файлу для загрузки.
     * @returns {Promise<Object>} Ответ сервера загрузки.
     * @throws {Error} Ошибка при загрузке файла.
     */
    async uploadFile(url, pathToFile) {
        const form = new FormData();
        form.set('photo', fileFromPathSync(pathToFile));

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: form,
            });

            if (!response.ok) {
                throw new Error(`Ошибка загрузки файла! Статус: ${response.status}!`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Ошибка при загрузке файла: ${error.message}!`);
        }
    }

    /**
     * Универсальный метод для отправки запросов к API ВКонтакте.
     * @param {string} endpoint - Конечная точка API.
     * @param {Object} params - Параметры запроса.
     * @param {string} [method='POST'] - Метод HTTP запроса.
     * @returns {Promise<Object>} Ответ API.
     */
    async #request(endpoint, params, method = 'POST') {
        params.access_token = this.#accessToken;
        params.v = API_VERSION;

        let url = `${API_BASE_URL}${endpoint}`;
        let options = {
            method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };

        const urlParams = new URLSearchParams(params);

        if (method === 'GET') {
            url += `?${urlParams.toString()}`;
        } else {
            options.body = urlParams;
        }

        const response = await fetch(url, options);
        return await response.json();
    }
}

export default VkApi;