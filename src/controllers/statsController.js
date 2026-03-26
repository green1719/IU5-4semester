const statsService = require('../services/statsService');

const getAllStats = (req, res) => {
    const { title } = req.query;
    const stats = statsService.findAll(title);
    res.json(stats);
};

const getStatById = (req, res) => {
    const id = parseInt(req.params.id);
    const stat = statsService.findOne(id);

    if (!stat) {
        return res.status(404).json({ error: 'Запись не найдена' });
    }

    res.json(stat);
};

const createStat = (req, res) => {
    const { title, text, formula, result } = req.body;

    // Простая валидация
    if (!title || !text || !formula) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const newStat = statsService.create({ title, text, formula, result: result || 0 });
    res.status(201).json(newStat);
};

const updateStat = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStat = statsService.update(id, req.body);

    if (!updatedStat) {
        return res.status(404).json({ error: 'Запись не найдена' });
    }

    res.json(updatedStat);
};

const deleteStat = (req, res) => {
    const id = parseInt(req.params.id);
    const success = statsService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Запись не найдена' });
    }

    res.status(204).send();
};

module.exports = {
    getAllStats,
    getStatById,
    createStat,
    updateStat,
    deleteStat
};