import resemble from "resemblejs";

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
    const charactersLength = characters.length;
    let randomText = '';

    for (let i = 0; i < length; i++) {
        randomText += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return randomText;
}

/**
 * Сравнивает два изображения и возвращает результат сравнения.
 * @param {string} imagePath1 Путь к первому изображению.
 * @param {string} imagePath2 Путь ко второму изображению.
 * @returns {Promise<Object>} Результат сравнения, который представляет собой объект с данными о сходстве изображений.
 */
async function compareImages(imagePath1, imagePath2) {
    return new Promise((resolve, reject) => {
        resemble(imagePath1)
            .compareTo(imagePath2)
            .scaleToSameSize()
            .onComplete(function(result) {
                resolve(result);
            });
    });
}

export default { generateRandomText, compareImages };
