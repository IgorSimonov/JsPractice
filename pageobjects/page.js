import SideBarMenu from './elements/sideBarMenu.js';
import Wall from './elements/wall.js';

/**
 * Страница.
 */
class Page {
    /**
     * Получает доступ к боковоу меню страницы.
     * @returns {SideBarMenu} Экземпляр бокового меню.
     */
    get sideBarMenu() {
        return SideBarMenu;
    }

    /**
     * Получает доступ к стене страницы.
     * @returns {Wall} Экземпляр стены.
     */
    get wall() {
        return Wall;
    }
}

export default Page;