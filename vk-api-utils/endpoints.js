/**
 * Создает конечные точки для операций с постами на стене.
 * @returns {Object} Объект с конечными точками для операций с постами на стене.
 */
const createWallEndpoints = () => {
    const BASE = 'wall';
    return {
        POST: `${BASE}.post`,              // Конечная точка для создания поста
        EDIT: `${BASE}.edit`,              // Конечная точка для редактирования поста
        DELETE: `${BASE}.delete`,          // Конечная точка для удаления поста
        CREATE_COMMENT: `${BASE}.createComment`, // Конечная точка для создания комментария к посту
    };
};

/**
 * Создает конечные точки для операций с лайками.
 * @returns {Object} Объект с конечными точками для операций с лайками.
 */
const createLikesEndpoints = () => {
    const BASE = 'likes';
    return {
        GET_LIST: `${BASE}.getList`,       // Конечная точка для получения списка лайков
    };
};

/**
 * Создает конечные точки для операций с фотографиями.
 * @returns {Object} Объект с конечными точками для операций с фотографиями.
 */
const createPhotosEndpoints = () => {
    const BASE = 'photos';
    return {
        GET_WALL_UPLOAD_SERVER: `${BASE}.getWallUploadServer`, // Конечная точка для получения сервера загрузки фотографий на стену
        SAVE_WALL_PHOTO: `${BASE}.saveWallPhoto`,              // Конечная точка для сохранения фотографии на стене
    };
};

export default {
    WALL: createWallEndpoints(),
    LIKES: createLikesEndpoints(),
    PHOTOS: createPhotosEndpoints(),
};