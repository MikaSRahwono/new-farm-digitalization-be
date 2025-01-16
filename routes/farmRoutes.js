const express = require('express');
const FarmController = require('../controllers/farmController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Farm:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - category
 *         - ownerId
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the farm
 *         category:
 *           type: string
 *           enum:
 *             - CowFarm
 *             - GoatFarm
 *             - SheepFarm
 *           description: The category/type of the farm
 *         ownerId:
 *           type: integer
 *           description: The ID of the owner (User) of the farm
 */

/**
 * @swagger
 * tags:
 *   name: Farms
 *   description: API for managing farms
 */

/**
 * @swagger
 * /api/farms:
 *   get:
 *     summary: Get all farms by ownerId
 *     tags: [Farms]
 *     parameters:
 *       - in: query
 *         name: ownerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Owner ID to filter farms
 *     responses:
 *       200:
 *         description: List of farms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Farm'
 */
router.get('/', FarmController.getAllFarms);

/**
 * @swagger
 * /api/farms/{id}:
 *   get:
 *     summary: Get a farm by ID
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Farm ID
 *     responses:
 *       200:
 *         description: Farm details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 *       404:
 *         description: Farm not found
 */
router.get('/:id', FarmController.getFarmById);

/**
 * @swagger
 * /api/farms:
 *   post:
 *     summary: Create a new farm
 *     tags: [Farms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farm'
 *     responses:
 *       201:
 *         description: Farm created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 */
router.post('/', FarmController.createFarm);

/**
 * @swagger
 * /api/farms/{id}:
 *   put:
 *     summary: Update an existing farm
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Farm ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farm'
 *     responses:
 *       200:
 *         description: Farm updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 *       404:
 *         description: Farm not found
 */
router.put('/:id', FarmController.updateFarm);

/**
 * @swagger
 * /api/farms/{id}:
 *   delete:
 *     summary: Delete a farm
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Farm ID
 *     responses:
 *       204:
 *         description: Farm deleted successfully
 *       404:
 *         description: Farm not found
 */
router.delete('/:id', FarmController.deleteFarm);

module.exports = router;
