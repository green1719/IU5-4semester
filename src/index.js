const express = require('express');
const path = require('path');
const outcomesRouter = require('./routes/outcomes');
const outcomesService = require('./services/outcomesService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/outcomes.json');

outcomesService.init(DATA_FILE_PATH);

// 1. Парсинг JSON тела запроса
app.use(express.json());

// 3. Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 4. Раздача статики (собранный фронтенд)
app.use(express.static(path.join(__dirname, '..', 'public')));

// 5. Информационный эндпоинт
app.get('/api', (req, res) => {
    res.json({
        message: 'Outcomes API Server',
        version: '1.0.0',
        endpoints: {
            'GET /outcomes':       'Получить все исходы (с опциональным поиском ?title=...)',
            'GET /outcomes/:id':   'Получить исход по ID',
            'POST /outcomes':      'Создать новый исход',
            'PATCH /outcomes/:id': 'Обновить исход',
            'DELETE /outcomes/:id':'Удалить исход'
        }
    });
});

// 6. Редирект с / на outcomes.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'outcomes.html'));
});

// 7. Маршруты
app.use('/outcomes', outcomesRouter);

// 7. 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// 8. Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
