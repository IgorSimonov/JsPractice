import { $ } from '@wdio/globals';

/**
 * Боковое меню.
 */
class SideBarMenu {
    /**
     * "Моя страница" в боковом меню.
     * @returns {WebdriverIO.Element} Элемент кнопки "Моя страница".
     */
    get myPageButton() {
        return $('#l_pr');
    }

    /**
     * Открывает страницу "Моя страница" нажатием на кнопку в боковом меню.
     * @returns {Promise<void>}
     */
    async openMyPage() {
        try {
            await this.myPageButton.click();
        } catch (error) {
            throw new Error(`Не удалось открыть "Моя страница": ${error.message}`);
        }
    }
}

export default new SideBarMenu();
