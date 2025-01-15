// routes/index.js
const express = require('express');
const router = express.Router();

const animalRoutes = require('./animalRoutes');
const healthRoutes = require('./healthRoutes');
const vaccineRoutes = require('./vaccineRoutes');
const medicationRoutes = require('./medicationRoutes');
const vitaminRoutes = require('./vitaminRoutes');
// Similarly, import other route files
const lactationDataRoutes = require('./lactationDataRoutes');
const milkDataRoutes = require('./milkDataRoutes');
const weightDataRoutes = require('./weightDataRoutes');
// ... other routes

router.use('/animals', animalRoutes);
router.use('/', healthRoutes);
router.use('/', vaccineRoutes);
router.use('/', vitaminRoutes);
router.use('/', medicationRoutes);
router.use('/', lactationDataRoutes);
router.use('/', milkDataRoutes);
router.use('/', weightDataRoutes);
// ... other routes

module.exports = router;