// routes/weightDataRoutes.js
const express = require('express');
const router = express.Router();
const weightDataController = require('../controllers/weightDataController');

/**
 * @swagger
 * tags:
 *   name: WeightData
 *   description: API for managing lactation data
 */

/**
 * @swagger
 * /api/weightData:
 *   post:
 *     summary: Create lactation data for an animal
 *     tags: [WeightData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - animalId
 *               - yearlyData
 *             properties:
 *               animalId:
 *                 type: integer
 *                 description: The animal ID
 *               yearlyData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - year
 *                     - data
 *                   properties:
 *                     year:
 *                       type: integer
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - month
 *                           - value
 *                         properties:
 *                           month:
 *                             type: string
 *                           value:
 *                             type: integer
 *             example:
 *               animalId: 1
 *               yearlyData:
 *                 - year: 2020
 *                   data:
 *                     - month: "Jan"
 *                       value: 1100
 *                     - month: "Feb"
 *                       value: 5500
 *                     # ... other months
 *     responses:
 *       201:
 *         description: Lactation data created successfully
 *       400:
 *         description: Bad request
 */
router.post('/weightData', weightDataController.createWeightData);

/**
 * @swagger
 * /api/weightData/animal/{animalId}:
 *   get:
 *     summary: Get lactation data for an animal
 *     tags: [WeightData]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The animal ID
 *     responses:
 *       200:
 *         description: Lactation data retrieved successfully
 *       404:
 *         description: Lactation data not found
 */
router.get('/weightData/animal/:animalId', weightDataController.getWeightDataByAnimalId);

/**
 * @swagger
 * /api/weightData/{id}:
 *   put:
 *     summary: Update lactation data
 *     tags: [WeightData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The lactation data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               yearlyData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     year:
 *                       type: integer
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                           value:
 *                             type: integer
 *             example:
 *               yearlyData:
 *                 - year: 2021
 *                   data:
 *                     - month: "Jan"
 *                       value: 1200
 *                     - month: "Feb"
 *                       value: 5600
 *                     # ... other months
 *     responses:
 *       200:
 *         description: Lactation data updated successfully
 *       404:
 *         description: Lactation data not found
 *       400:
 *         description: Bad request
 */
router.put('/weightData/:id', weightDataController.updateWeightData);

/**
 * @swagger
 * /api/weightData/{id}:
 *   delete:
 *     summary: Delete lactation data
 *     tags: [WeightData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The lactation data ID
 *     responses:
 *       200:
 *         description: Lactation data deleted successfully
 *       404:
 *         description: Lactation data not found
 */
router.delete('/weightData/:id', weightDataController.deleteWeightData);

module.exports = router;