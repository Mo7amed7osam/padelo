const express = require('express');
const router = express.Router();
const courtController = require('../controllers/court.controller');

router.get('/', courtController.getCourts);

router.post('/', courtController.addCourt);

router.put('/:id', courtController.updateCourt);

router.delete('/:id', courtController.deleteCourt);

router.get('/search', courtController.searchCourts);

router.get('/:id', courtController.getCourtById);

module.exports = router;
