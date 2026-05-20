const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
    console.log(`[OutcomesService] Initialized with data file: ${filePath}`);
};

const findAll = (title) => {
    const outcomes = fileService.readData(dataFilePath);
    if (title) {
        return outcomes.filter(outcome =>
            outcome.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return outcomes;
};

const findOne = (id) => {
    const outcomes = fileService.readData(dataFilePath);
    return outcomes.find(outcome => outcome.id === id);
};

const create = (outcomeData) => {
    const outcomes = fileService.readData(dataFilePath);
    const newId = outcomes.length > 0
        ? Math.max(...outcomes.map(o => o.id)) + 1
        : 1;
    const newOutcome = { id: newId, ...outcomeData };
    outcomes.push(newOutcome);
    fileService.writeData(dataFilePath, outcomes);
    return newOutcome;
};

const update = (id, outcomeData) => {
    const outcomes = fileService.readData(dataFilePath);
    const index = outcomes.findIndex(o => o.id === id);
    if (index === -1) return null;
    outcomes[index] = { ...outcomes[index], ...outcomeData };
    fileService.writeData(dataFilePath, outcomes);
    return outcomes[index];
};

const remove = (id) => {
    const outcomes = fileService.readData(dataFilePath);
    const filtered = outcomes.filter(o => o.id !== id);
    if (filtered.length === outcomes.length) return false;
    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
