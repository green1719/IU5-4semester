const fileService = require('./fileService');

// Переменная для хранения пути к файлу данных, будет установлена при инициализации
let dataFilePath;

// Функция инициализации сервиса с путем к файлу данных
const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const stats = fileService.readData(dataFilePath);
    if (title) {
        return stats.filter(stat =>
            stat.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return stats;
};

const findOne = (id) => {
    const stats = fileService.readData(dataFilePath);
    return stats.find(stat => stat.id === id);
};

const create = (statData) => {
    const stats = fileService.readData(dataFilePath);

    // Генерация ID: берем максимальный ID + 1
    const newId = stats.length > 0
        ? Math.max(...stats.map(s => s.id)) + 1
        : 1;

    const newStat = { id: newId, ...statData };
    stats.push(newStat);
    fileService.writeData(dataFilePath, stats);
    return newStat;
};

const update = (id, statData) => {
    const stats = fileService.readData(dataFilePath);
    const index = stats.findIndex(s => s.id === id);

    if (index === -1) return null;

    stats[index] = { ...stats[index], ...statData };
    fileService.writeData(dataFilePath, stats);
    return stats[index];
};

const remove = (id) => {
    const stats = fileService.readData(dataFilePath);
    const filteredStats = stats.filter(s => s.id !== id);

    if (filteredStats.length === stats.length) {
        return false; // Ничего не удалили
    }

    fileService.writeData(dataFilePath, filteredStats);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };