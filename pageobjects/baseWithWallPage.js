import BaseWithSideBarMenuPage from "./baseWithSideBarMenuPage.js";
import Wall from "./elements/wall.js";

/**
 * Базовый класс для страниц с боковым меню и стеной.
 */
class BaseWithWallPage extends BaseWithSideBarMenuPage {
    /**
     * Стена.
     * @type {Wall}
     */
    wall = new Wall()

    /**
     * Создает экземпляр BaseWithWallPage.
     * @param {string} name - Имя страницы.
     */
    constructor(name) {
        super(name);
    }
}

export default BaseWithWallPage;