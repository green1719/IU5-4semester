const outcomesService = require('../services/outcomesService');

const getAllOutcomes = (req, res) => {
    const { title } = req.query;
    const outcomes = outcomesService.findAll(title);
    res.json(outcomes);
};

const getOutcomeById = (req, res) => {
    const id = parseInt(req.params.id);
    const outcome = outcomesService.findOne(id);
    if (!outcome) {
        return res.status(404).json({ error: 'Исход не найден' });
    }
    res.json(outcome);
};

const createOutcome = (req, res) => {
    const { title, description, probability, category, experiment } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Поля title и description обязательны' });
    }
    const newOutcome = outcomesService.create({ title, description, probability, category, experiment });
    res.status(201).json(newOutcome);
};

const updateOutcome = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = outcomesService.update(id, req.body);
    if (!updated) {
        return res.status(404).json({ error: 'Исход не найден' });
    }
    res.json(updated);
};

const deleteOutcome = (req, res) => {
    const id = parseInt(req.params.id);
    const success = outcomesService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Исход не найден' });
    }
    res.status(204).send();
};

module.exports = {
    getAllOutcomes,
    getOutcomeById,
    createOutcome,
    updateOutcome,
    deleteOutcome
};
