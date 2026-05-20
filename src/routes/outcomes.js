const express = require('express');
const router = express.Router();
const outcomesController = require('../controllers/outcomesController');

router.get('/',      outcomesController.getAllOutcomes);   // GET  /outcomes?title=... — список + поиск
router.get('/:id',   outcomesController.getOutcomeById);  // GET  /outcomes/:id
router.post('/',     outcomesController.createOutcome);   // POST /outcomes
router.patch('/:id', outcomesController.updateOutcome);   // PATCH /outcomes/:id
router.delete('/:id',outcomesController.deleteOutcome);   // DELETE /outcomes/:id

module.exports = router;
