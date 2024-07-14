import resemble from "resemblejs";

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

export default { compareImages };
