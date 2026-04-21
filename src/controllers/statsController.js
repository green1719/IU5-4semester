const statsService = require('../services/statsService');

const getAllStats = (req, res) => {
    // Поиск по названию через query-параметр: GET /stats?title=Выборка
    const { title } = req.query;
    console.log(`[StatsController] getAllStats called, title filter: ${title || 'none'}`);
    const stats = statsService.findAll(title);
    console.log(`[StatsController] Found ${stats.length} records`);
    res.json(stats);
};

const getStatById = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`[StatsController] getStatById called with id: ${id}`);
    const stat = statsService.findOne(id);

    if (!stat) {
        return res.status(404).json({ error: 'Запись не найдена' });
    }

    res.json(stat);
};

const createStat = (req, res) => {
    const { title, description, values } = req.body;

    // Простая валидация обязательных полей
    if (!title || !description) {
        return res.status(400).json({ error: 'Поля title и description обязательны' });
    }

    // Инициальные методы с нулевыми результатами
    const initialMethods = [
        {
            id: 1,
            name: 'Математическое ожидание',
            formula: 'M(X) = Σ xi / n',
            result: 0
        },
        {
            id: 2,
            name: 'Дисперсия',
            formula: 'D(X) = Σ(x - M)² / n',
            result: 0
        },
        {
            id: 3,
            name: 'Медиана',
            formula: 'Me = x[(n+1)/2]',
            result: 0
        },
        {
            id: 4,
            name: 'Стандартное отклонение',
            formula: 'σ = √D(X)',
            result: 0
        }
    ];

    const newStat = statsService.create({
        title,
        description,
        values: values || [],
        methods: initialMethods
    });

    res.status(201).json(newStat);
};

const updateStat = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`[StatsController] updateStat called with id: ${id}`);
    const updatedStat = statsService.update(id, req.body);

    if (!updatedStat) {
        return res.status(404).json({ error: 'Запись не найдена' });
    }

    res.json(updatedStat);
};

const deleteStat = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`[StatsController] deleteStat called with id: ${id}`);
    const success = statsService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Запись не найдена' });
    }

    res.status(204).send();
};

// Добавление числового значения в массив values выборки
const addValueToStat = (req, res) => {
    const id = parseInt(req.params.id);
    const { value } = req.body;

    console.log(`[StatsController] addValueToStat called with id: ${id}, value: ${value}`);

    if (value === undefined || typeof value !== 'number') {
        return res.status(400).json({ error: 'Поле value должно быть числом' });
    }

    const updatedStat = statsService.addValue(id, value);

    if (!updatedStat) {
        return res.status(404).json({ error: 'Запись не найдена' });
    }

    res.json(updatedStat);
};

module.exports = {
    getAllStats,
    getStatById,
    createStat,
    updateStat,
    deleteStat,
    addValueToStat
};
