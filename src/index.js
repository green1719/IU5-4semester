const express = require('express');
const path = require('path');
const statsRouter = require('./routes/stats');
const statsService = require('./services/statsService');

const app = express();
const PORT = 3000;

// ============ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ============
console.log('[AppFactory] Starting Stats application...');

// Определяем путь к файлу данных
const DATA_FILE_PATH = path.join(__dirname, 'data/stats.json');

// Инициализируем сервис с путем к файлу данных
console.log('[ServiceLoader] Initializing StatsService +0ms');
statsService.init(DATA_FILE_PATH);
console.log('[ServiceLoader] StatsService initialized +1ms');

console.log('[ServiceLoader] Initializing FileService +0ms');
console.log('[ServiceLoader] FileService initialized +0ms');

// 1. Встроенный middleware для парсинга JSON
console.log('[MiddlewareLoader] Loading express.json() +0ms');
app.use(express.json());

// 2. Логирующий middleware
console.log('[MiddlewareLoader] Loading request logger middleware +0ms');
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    console.log(`[${timestamp}] Query params:`, req.query);
    next();
});

// Раздача собранного фронтенда из папки public как статики
app.use(express.static(path.join(__dirname, '..', 'public')));

// 3. Подключение маршрутов
console.log('[RoutesResolver] Mapping {/api, GET} route +0ms');
app.get('/api', (req, res) => {
    res.json({
        message: 'Stats API Server',
        version: '1.0.0',
        endpoints: {
            'GET /stats': 'Получить все выборки (с опциональным поиском ?title=...)',
            'GET /stats/:id': 'Получить выборку по ID',
            'POST /stats': 'Создать новую выборку',
            'PATCH /stats/:id': 'Обновить выборку',
            'DELETE /stats/:id': 'Удалить выборку',
            'POST /stats/:id/values': 'Добавить значение в выборку'
        }
    });
});

console.log('[RoutesResolver] Mapping {/stats, GET} route +0ms');
console.log('[RoutesResolver] Mapping {/stats, POST} route +0ms');
console.log('[RoutesResolver] Mapping {/stats/:id, GET} route +0ms');
console.log('[RoutesResolver] Mapping {/stats/:id, PATCH} route +0ms');
console.log('[RoutesResolver] Mapping {/stats/:id, DELETE} route +0ms');
console.log('[RoutesResolver] Mapping {/stats/:id/values, POST} route +0ms');
app.use('/stats', statsRouter);
console.log('[Router] Successfully loaded 6 routes +1ms');

// 4. Глобальная обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// 5. Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// 6. Запуск сервера
console.log('[ExpressApplication] Express application successfully started +2ms');
app.listen(PORT, () => {
    console.log(`Application started successfully`);
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});