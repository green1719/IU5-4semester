const fileService = require('./fileService');

// Переменная для хранения пути к файлу данных, будет установлена при инициализации
let dataFilePath;

// Функция инициализации сервиса с путем к файлу данных
const init = (filePath) => {
    dataFilePath = filePath;
    console.log(`[StatsService] Initialized with data file: ${filePath}`);
};

// Пересчёт всех методов статистики по массиву значений
const calculateMethods = (values) => {
    if (!values || values.length === 0) {
        return [
            { id: 1, name: 'Математическое ожидание', formula: 'M(X) = Σ xi / n', result: 0 },
            { id: 2, name: 'Дисперсия', formula: 'D(X) = Σ(x - M)² / n', result: 0 },
            { id: 3, name: 'Медиана', formula: 'Me = x[(n+1)/2]', result: 0 },
            { id: 4, name: 'Стандартное отклонение', formula: 'σ = √D(X)', result: 0 }
        ];
    }

    const n = values.length;

    // Среднее (Математическое ожидание): M = Σx / n
    const mean = values.reduce((sum, x) => sum + x, 0) / n;

    // Дисперсия: D = Σ(x - M)² / n
    const variance = values.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;

    // Медиана: середина отсортированного массива
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Стандартное отклонение: σ = √D
    const std = Math.sqrt(variance);

    return [
        {
            id: 1,
            name: 'Математическое ожидание',
            formula: 'M(X) = Σ xi / n',
            result: Math.round(mean * 100) / 100
        },
        {
            id: 2,
            name: 'Дисперсия',
            formula: 'D(X) = Σ(x - M)² / n',
            result: Math.round(variance * 100) / 100
        },
        {
            id: 3,
            name: 'Медиана',
            formula: 'Me = x[(n+1)/2]',
            result: Math.round(median * 100) / 100
        },
        {
            id: 4,
            name: 'Стандартное отклонение',
            formula: 'σ = √D(X)',
            result: Math.round(std * 100) / 100
        }
    ];
};

const findAll = (title) => {
    const stats = fileService.readData(dataFilePath);

    // Поиск по названию (регистронезависимый)
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

// Добавление числового значения в массив values и пересчёт всех методов
const addValue = (id, value) => {
    const stats = fileService.readData(dataFilePath);
    const index = stats.findIndex(s => s.id === id);

    if (index === -1) return null;

    stats[index].values = [...(stats[index].values || []), value];

    // Автоматический пересчёт всех методов по обновлённому массиву
    stats[index].methods = calculateMethods(stats[index].values);

    fileService.writeData(dataFilePath, stats);
    return stats[index];
};

module.exports = { init, findAll, findOne, create, update, remove, addValue };
