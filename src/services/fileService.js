const fs = require('fs');

const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(data);
        console.log(`[FileService] Read ${parsed.length} records from ${filePath}`);
        return parsed;
    } catch (err) {
        console.error('Ошибка чтения файла:', err.message);
        return [];
    }
};

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Ошибка записи файла:', err);
    }
};

module.exports = {
    readData,
    writeData
};