// routes/weightRoutes.js
const express = require('express');
const WeightController = require('../controllers/weightController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Weights
 *   description: Weight management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Weight:
 *       type: object
 *       properties:
 *         animalId:
 *           type: integer
 *           description: The ID of the animal associated with the weight
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the weight measurement
 *         mass:
 *           type: integer
 *           description: The mass of the animal in kilograms
 */

/**
 * @swagger
 * /api/weights:
 *   post:
 *     summary: Create a new Weight record
 *     tags: [Weights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weight'
 *     responses:
 *       201:
 *         description: Weight created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weight'
 *       500:
 *         description: Internal server error
 */
router.post('/', WeightController.createWeight);

/**
 * @swagger
 * /api/weights/animal/{animalId}:
 *   get:
 *     summary: Get all Weights by animalId
 *     tags: [Weights]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         description: The ID of the animal to filter weights
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of weights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Weight'
 *       500:
 *         description: Internal server error
 */
router.get('/animal/:animalId', WeightController.getAllWeightsByAnimalId);

/**
 * @swagger
 * /api/weights/{id}:
 *   get:
 *     summary: Get a single Weight record by ID
 *     tags: [Weights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the weight record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A Weight record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weight'
 *       500:
 *         description: Internal server error
 */
router.get('/:id', WeightController.getWeightById);

/**
 * @swagger
 * /api/weights/{id}:
 *   put:
 *     summary: Update a Weight record by ID
 *     tags: [Weights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the weight record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weight'
 *     responses:
 *       200:
 *         description: Updated Weight record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weight'
 *       500:
 *         description: Internal server error
 */
router.put('/:id', WeightController.updateWeight);

/**
 * @swagger
 * /api/weights/{id}:
 *   delete:
 *     summary: Delete a Weight record by ID
 *     tags: [Weights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the weight record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Weight deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', WeightController.deleteWeight);

module.exports = router;