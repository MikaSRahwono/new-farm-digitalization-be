// routes/milkProductionRoutes.js
const express = require('express');
const MilkProductionController = require('../controllers/milkProductionController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MilkProductions
 *   description: Milk production management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MilkProduction:
 *       type: object
 *       properties:
 *         dateOfProduction:
 *           type: string
 *           format: date-time
 *           description: The date of milk production
 *         quantity:
 *           type: integer
 *           description: The quantity of milk produced
 *         animalId:
 *           type: integer
 *           description: The ID of the animal associated with the milk production
 */

/**
 * @swagger
 * /api/milkproductions:
 *   post:
 *     summary: Create a new MilkProduction record
 *     tags: [MilkProductions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MilkProduction'
 *     responses:
 *       201:
 *         description: MilkProduction created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MilkProduction'
 *       500:
 *         description: Internal server error
 */
router.post('/', MilkProductionController.createMilkProduction);

/**
 * @swagger
 * /api/milkproductions/animal/{animalId}:
 *   get:
 *     summary: Get all MilkProductions by animalId
 *     tags: [MilkProductions]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         description: The ID of the animal to filter milk productions
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of milk productions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MilkProduction'
 *       500:
 *         description: Internal server error
 */
router.get('/animal/:animalId', MilkProductionController.getAllMilkProductionsByAnimalId);

/**
 * @swagger
 * /api/milkproductions/{id}:
 *   get:
 *     summary: Get a single MilkProduction record by ID
 *     tags: [MilkProductions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the milk production record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A MilkProduction record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MilkProduction'
 *       500:
 *         description: Internal server error
 */
router.get('/:id', MilkProductionController.getMilkProductionById);

/**
 * @swagger
 * /api/milkproductions/{id}:
 *   put:
 *     summary: Update a MilkProduction record by ID
 *     tags: [MilkProductions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the milk production record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MilkProduction'
 *     responses:
 *       200:
 *         description: Updated MilkProduction record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MilkProduction'
 *       500:
 *         description: Internal server error
 */
router.put('/:id', MilkProductionController.updateMilkProduction);

/**
 * @swagger
 * /api/milkproductions/{id}:
 *   delete:
 *     summary: Delete a MilkProduction record by ID
 *     tags: [MilkProductions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the milk production record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: MilkProduction deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', MilkProductionController.deleteMilkProduction);

module.exports = router;