const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Определение маршрутов
router.get('/', statsController.getAllStats);
router.get('/:id', statsController.getStatById);
router.post('/', statsController.createStat);
router.patch('/:id', statsController.updateStat);
router.delete('/:id', statsController.deleteStat);

module.exports = router;