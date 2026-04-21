const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Определение маршрутов
router.get('/', statsController.getAllStats);           // GET  /stats?title=... — список + поиск
router.get('/:id', statsController.getStatById);       // GET  /stats/:id
router.post('/', statsController.createStat);          // POST /stats
router.patch('/:id', statsController.updateStat);      // PATCH /stats/:id
router.delete('/:id', statsController.deleteStat);     // DELETE /stats/:id

// Добавление значения в массив выборки
router.post('/:id/values', statsController.addValueToStat); // POST /stats/:id/values

module.exports = router;
