// routes/lactationRoutes.js
const express = require('express');
const LactationController = require('../controllers/lactationController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lactations
 *   description: Lactation management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Lactation:
 *       type: object
 *       properties:
 *         animalId:
 *           type: integer
 *           description: The ID of the animal associated with the lactation
 *         spouseId:
 *           type: integer
 *           description: The ID of the spouse animal
 *         lactation_number:
 *           type: integer
 *           description: The lactation number
 *         dob:
 *           type: string
 *           format: date
 *           description: Date of birth
 *         total_child:
 *           type: integer
 *           description: Total number of children
 *         total_male_child:
 *           type: integer
 *           description: Total number of male children
 *         total_female_child:
 *           type: integer
 *           description: Total number of female children
 *     LactationChild:
 *       type: object
 *       properties:
 *         gender:
 *           type: string
 *           description: Gender of the lactation child
 */

/**
 * @swagger
 * /api/lactations:
 *   post:
 *     summary: Create a new Lactation record
 *     tags: [Lactations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lactationData:
 *                 $ref: '#/components/schemas/Lactation'
 *               lactationChildData:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/LactationChild'
 *     responses:
 *       201:
 *         description: Lactation created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lactation'
 *       500:
 *         description: Internal server error
 */
router.post('/', LactationController.createLactation);

/**
 * @swagger
 * /api/lactations/animal/{animalId}:
 *   get:
 *     summary: Get all lactations by animalId
 *     tags: [Lactations]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         description: The ID of the animal to filter lactations
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of lactations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lactation'
 *       500:
 *         description: Internal server error
 */
router.get('/animal/:animalId', LactationController.getAllLactationsByAnimalId);

/**
 * @swagger
 * /api/lactations/{id}:
 *   get:
 *     summary: Get a single Lactation record by ID
 *     tags: [Lactations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lactation record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A Lactation record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lactation'
 *       500:
 *         description: Internal server error
 */
router.get('/:id', LactationController.getLactationById);

/**
 * @swagger
 * /api/lactations/{id}:
 *   put:
 *     summary: Update a Lactation record by ID
 *     tags: [Lactations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lactation record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lactation'
 *     responses:
 *       200:
 *         description: Updated Lactation record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lactation'
 *       500:
 *         description: Internal server error
 */
router.put('/:id', LactationController.updateLactation);

/**
 * @swagger
 * /api/lactations/{id}:
 *   delete:
 *     summary: Delete a Lactation record by ID
 *     tags: [Lactations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lactation record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Lactation deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', LactationController.deleteLactation);

module.exports = router;