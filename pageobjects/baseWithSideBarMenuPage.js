import BasePage from './basePage.js';
import SideBarMenu from "./elements/sideBarMenu.js";

/**
 * Базовый класс для страниц с боковым меню.
 */
class BaseWithSideBarMenuPage extends BasePage {
    /**
     * Боковое меню.
     * @type {SideBarMenu}
     */
    sideBarMenu = new SideBarMenu();

    constructor(name) {
        super(name);
    }
}

export default BaseWithSideBarMenuPage;