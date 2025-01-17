// routes/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const farmRoutes = require('./farmRoutes');
const farmRequestRoutes = require('./farmRequestRoutes');
const authenticationRoutes = require('./authenticationRoutes');

const animalRoutes = require('./animalRoutes');
const healthRoutes = require('./healthRoutes');
const vaccineRoutes = require('./vaccineRoutes');
const medicationRoutes = require('./medicationRoutes');
const vitaminRoutes = require('./vitaminRoutes');

const lactationDataRoutes = require('./lactationDataRoutes');
const milkDataRoutes = require('./milkDataRoutes');
const weightDataRoutes = require('./weightDataRoutes');

const livestockCustomIdRoutes = require('./livestockCustomIdRoutes');
const activityRoutes = require('./activityRoutes');

router.use('/users', userRoutes);
router.use('/farms', farmRoutes);
router.use('/animals', animalRoutes);
router.use('/farm-requests', farmRequestRoutes);
router.use('/auth', authenticationRoutes);
router.use('/livestock-custom-ids', livestockCustomIdRoutes);
router.use('/activities', activityRoutes);
router.use('/', healthRoutes);
router.use('/', vaccineRoutes);
router.use('/', vitaminRoutes);
router.use('/', medicationRoutes);
router.use('/', lactationDataRoutes);
router.use('/', milkDataRoutes);
router.use('/', weightDataRoutes);


module.exports = router;