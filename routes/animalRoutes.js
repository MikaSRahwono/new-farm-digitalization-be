const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

/**
 * @swagger
 * components:
 *   schemas:
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
 *         - farm_id
 *         - grade
 *         - condition
 *         - status
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
 *         category:
 *           type: string
 *           description: Category of the animal
 *         type_id:
 *           type: string
 *           description: Type ID
 *         farm_name:
 *           type: string
 *           description: Name of the farm
 *         farmId:
 *           type: integer
 *           description: Farm id
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
 *         grade:
 *           type: string
 *           description: Grade of the animal (nullable)
 *         condition:
 *           type: string
 *           description: Condition of the animal (nullable)
 *         status:
 *           type: string
 *           description: Status of the animal (nullable)
 *       example:
 *         name_id: "A001"
 *         gender: "MALE"
 *         dob: "2020-01-01"
 *         weight: "300kg"
 *         phase: "Growing"
 *         photo_url: "http://example.com/photo.jpg"
 *         breed: "Jersey"
 *         category: "Kambing"
 *         type_id: "Dairy"
 *         farm_name: "Farm A"
 *         farmId: 1
 *         dad_name_id: "D001"
 *         mom_name_id: "M001"
 *         grandpa_name_id: "G001"
 *         grandma_name_id: "G002"
 *         grade: "A"
 *         condition: "Sehat"
 *         status: "Tersedia"
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