const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

/**
 * @swagger
 * components:
 *   schemas:
 *     HistoryItem:
 *       type: object
 *       required:
 *         - title
 *         - value
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the history item
 *         value:
 *           type: string
 *           description: Value of the history item
 *       example:
 *         title: "Health Checkup"
 *         value: "October 2022"
 *
 *     Condition:
 *       type: object
 *       required:
 *         - current_condition
 *         - history_items
 *       properties:
 *         current_condition:
 *           type: string
 *           description: Current condition
 *         history_items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HistoryItem'
 *       example:
 *         current_condition: "Healthy"
 *         history_items:
 *           - title: "Health Checkup"
 *             value: "October 2022"
 *           - title: "Vaccination"
 *             value: "December 2022"
 *
 *     YearlyDataItem:
 *       type: object
 *       required:
 *         - month
 *         - value
 *       properties:
 *         month:
 *           type: string
 *           description: Month of the year
 *         value:
 *           type: integer
 *           description: Value for the month
 *       example:
 *         month: "Jan"
 *         value: 1100
 *
 *     YearlyData:
 *       type: object
 *       required:
 *         - year
 *         - data
 *       properties:
 *         year:
 *           type: integer
 *           description: Year of the data
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/YearlyDataItem'
 *       example:
 *         year: 2018
 *         data:
 *           - month: "Jan"
 *             value: 1100
 *           - month: "Feb"
 *             value: 5500
 *
 *     Animal:
 *       type: object
 *       required:
 *         - name_id
 *         - gender
 *         - dob
 *         - weight
 *         - phase
 *         - photo_url
 *         - breed
 *         - type_id
 *         - farm_name
 *       properties:
 *         name_id:
 *           type: string
 *           description: Name ID of the animal
 *         gender:
 *           type: string
 *           enum: [MALE, FEMALE]
 *         dob:
 *           type: string
 *           format: date
 *           description: Date of birth
 *         weight:
 *           type: string
 *           description: Weight of the animal
 *         phase:
 *           type: string
 *           description: Phase of the animal
 *         photo_url:
 *           type: string
 *           description: URL to the animal's photo
 *         breed:
 *           type: string
 *           description: Breed of the animal
 *         type_id:
 *           type: string
 *           description: Type ID
 *         farm_name:
 *           type: string
 *           description: Name of the farm
 *         dad_name_id:
 *           type: string
 *           description: Father's name ID (nullable)
 *         mom_name_id:
 *           type: string
 *           description: Mother's name ID (nullable)
 *         grandpa_name_id:
 *           type: string
 *           description: Grandfather's name ID (nullable)
 *         grandma_name_id:
 *           type: string
 *           description: Grandmother's name ID (nullable)
 */

/**
 * @swagger
 * tags:
 *   name: Animals
 *   description: API for managing animals
 */

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: Create a new animal
 *     tags: [Animals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Bad request
 */
router.post('/', animalController.createAnimal);

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: Retrieve a list of animals
 *     tags: [Animals]
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [MALE, FEMALE]
 *         description: Filter by gender
 *       - in: query
 *         name: breed
 *         schema:
 *           type: string
 *         description: Filter by breed
 *       - in: query
 *         name: farm_name
 *         schema:
 *           type: string
 *         description: Filter by farm name
 *     responses:
 *       200:
 *         description: A list of animals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *       500:
 *         description: Server error
 */
router.get('/', animalController.getAllAnimals);

/**
 * @swagger
 * /api/animals/{id}:
 *   get:
 *     summary: Get a single animal by ID
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The animal ID
 *     responses:
 *       200:
 *         description: Animal data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       404:
 *         description: Animal not found
 *       500:
 *         description: Server error
 */
router.get('/:id', animalController.getAnimalById);

/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     summary: Update an animal by ID
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The animal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: Animal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Animal not found
 *       500:
 *         description: Server error
 */
router.put('/:id', animalController.updateAnimal);

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     summary: Delete an animal by ID
 *     tags: [Animals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The animal ID
 *     responses:
 *       200:
 *         description: Animal deleted successfully
 *       404:
 *         description: Animal not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;