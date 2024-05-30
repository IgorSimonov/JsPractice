import { $ } from '@wdio/globals';

/**
 * Страница авторизации.
 */
class LoginPage {
    /**
     * Поле для ввода логина.
     * @returns {WebdriverIO.Element} Элемент поля ввода логина.
     */
    get loginInput() {
        return $('#index_email');
    }

    /**
     * Поле для ввода пароля.
     * @returns {WebdriverIO.Element} Элемент поля ввода пароля.
     */
    get passwordInput() {
        return $('.vkc__TextField__input[name = password]');
    }

    /**
     * Кнопка авторизации.
     * @return {WebdriverIO.Element} Кнопка авторизации.
     */
    get signInButton() {
        return $('button.VkIdForm__signInButton');
    }

    /**
     * Кнопка "Продолжить" после ввода пароля.
     * @returns {WebdriverIO.Element} Кнопка "Продолжить".
     */
    get continueButton() {
        return $('.vkuiButton__in');
    }

    /**
     * Опция выбора русского языка.
     * @returns {WebdriverIO.Element} Опция для выбора русского языка.
     */
    get languageOptionRu() {
        return $('a.footer_lang_link[onclick*="Language.changeLang(this, 0"]');
    }

    /**
     * Опция для выбора английского языка.
     * @returns {WebdriverIO.Element} Опция для выбора английского языка.
     */
    get languageOptionEn() {
        return $('a.footer_lang_link[onclick*="Language.changeLang(this, 3"]');
    }

    /**
     * Переключает язык интерфейса сайта на заданный.
     * @param {string} desiredLang - Желаемый язык интерфейса ('ru' или 'en').
     * @returns {Promise<void>}
     * @throws {Error} Если язык не переключился.
     */
    async switchLanguage(desiredLang) {
        try {
            const currentLang = await browser.execute(() => {
                return document.documentElement.lang || document.querySelector('html').lang;
            });

            if (desiredLang === 'ru' && currentLang !== 'ru') {
                await this.languageOptionRu.click();
            } else if (desiredLang === 'en' && currentLang !== 'en') {
                await this.languageOptionEn.click();
            }

            await browser.waitUntil(async () => {
                const newLang = await browser.execute(() => {
                    return document.documentElement.lang || document.querySelector('html').lang;
                });
                return newLang === desiredLang;
            }, {
                timeout: 10000,
                timeoutMsg: 'Язык страницы не переключился в течение 10 секунд!'
            });
        } catch (error) {
            throw new Error(`Ошибка при переключении языка на ${desiredLang}: ${error.message}`);
        }
    }

    /**
     * Авторизация пользователя.
     * @param {string | number} login Логин пользователя.
     * @param {string | number} password Пароль пользователя.
     */
    async authorization(login, password) {
        await this.loginInput.addValue(login);
        await this.signInButton.click();
        await this.passwordInput.addValue(password);
        await this.continueButton.click();
    }
}

export default new LoginPage();