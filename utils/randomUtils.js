/**
 * Генерирует случайную строку указанной длины.
 * @param {number} [length=10] - Длина генерируемой случайной строки. По умолчанию 10.
 * @returns {string} - Сгенерированная случайная строка.
 * @throws {Error} - Если длина не является положительным числом.
 */
function generateRandomText(length = 10) {
    if (typeof length !== 'number' || length <= 0) {
        throw new Error('Длина должна быть положительным числом');
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';

    for (let i = 0; i < length; i++) {
        randomText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomText;
}

export default { generateRandomText }