import baseElement from "../../framework/elements/baseElement.js";
import Button from "../../framework/elements/button.js";

/**
 * Боковое меню.
 */
class SideBarMenu extends baseElement {
    #myPageButton = new Button('#l_pr', 'Кнопка \"Моя страница\"', this)

    constructor() {
        super('#react_rootLeftMenuRoot', 'Боковое меню');
    }

    /**
     * Открывает страницу "Моя страница".
     * @returns {Promise<void>}
     */
    async openMyPage() {
        await this.#myPageButton.click();
    }
}

export default SideBarMenu;
