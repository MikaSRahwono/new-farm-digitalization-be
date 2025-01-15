// routes/healthRoutes.js
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: API for managing health data  
 */

/**
 * @swagger
 * /api/animals/{animalId}/health:
 *   post:
 *     summary: Create health data for an animal
 *     tags: [Health]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The animal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - current_condition
 *             properties:
 *               current_condition:
 *                 type: string
 *                 description: Current health condition
 *               animalId:
 *                 type: integer
 *                 description: Animal Id
 *               history_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     value:
 *                       type: string
 *             example:
 *               current_condition: "Healthy"
 *               animalId: 1
 *               history_items:
 *                 - title: "Health Checkup"
 *                   value: "March 2019"
 *                 - title: "Vaccination"
 *                   value: "May 2019"
 *     responses:
 *       201:
 *         description: Health data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Health'
 *       400:
 *         description: Bad request
 */
router.post('/animals/:animalId/health', healthController.createHealth);

/**
 * @swagger
 * /api/animals/{animalId}/health:
 *   get:
 *     summary: Get health data for an animal
 *     tags: [Health]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The animal ID
 *     responses:
 *       200:
 *         description: Health data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Health'
 *       404:
 *         description: Health data not found
 */
router.get('/animals/:animalId/health', healthController.getHealthByAnimalId);

/**
 * @swagger
 * /api/health/{id}:
 *   put:
 *     summary: Update health data
 *     tags: [Health]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The health data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               current_condition:
 *                 type: string
 *               history_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     value:
 *                       type: string
 *             example:
 *               current_condition: "Healthy"
 *               history_items:
 *                 - title: "Health Checkup"
 *                   value: "April 2019"
 *     responses:
 *       200:
 *         description: Health data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Health'
 *       404:
 *         description: Health data not found
 *       400:
 *         description: Bad request
 */
router.put('/health/:id', healthController.updateHealth);

/**
 * @swagger
 * /api/health/{id}:
 *   delete:
 *     summary: Delete health data
 *     tags: [Health]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The health data ID
 *     responses:
 *       200:
 *         description: Health data deleted successfully
 *       404:
 *         description: Health data not found
 */
router.delete('/health/:id', healthController.deleteHealth);

module.exports = router;