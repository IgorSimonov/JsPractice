/**
 * Удаляет подстроку '/id' из указанной строки.
 * @param {string} string - Исходная строка, из которой нужно удалить подстроку '/id'.
 * @returns {string} - Строка без подстроки '/id'.
 */
function removeIdFromString(string) {
    return string.replace('/id', '');
}

export default { removeIdFromString }