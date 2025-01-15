// routes/vitaminRoutes.js
const express = require('express');
const router = express.Router();
const vitaminController = require('../controllers/vitaminController');

/**
 * @swagger
 * tags:
 *   name: Vitamin
 *   description: API for managing vitamin data  
 */

/**
 * @swagger
 * /api/animals/{animalId}/vitamin:
 *   post:
 *     summary: Create vitamin data for an animal
 *     tags: [Vitamin]
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
 *                 description: Current vitamin condition
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
 *               current_condition: "Vitaminy"
 *               animalId: 1
 *               history_items:
 *                 - title: "Vitamin Checkup"
 *                   value: "March 2019"
 *                 - title: "Vaccination"
 *                   value: "May 2019"
 *     responses:
 *       201:
 *         description: Vitamin data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitamin'
 *       400:
 *         description: Bad request
 */
router.post('/animals/:animalId/vitamin', vitaminController.createVitamin);

/**
 * @swagger
 * /api/animals/{animalId}/vitamin:
 *   get:
 *     summary: Get vitamin data for an animal
 *     tags: [Vitamin]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The animal ID
 *     responses:
 *       200:
 *         description: Vitamin data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitamin'
 *       404:
 *         description: Vitamin data not found
 */
router.get('/animals/:animalId/vitamin', vitaminController.getVitaminByAnimalId);

/**
 * @swagger
 * /api/vitamin/{id}:
 *   put:
 *     summary: Update vitamin data
 *     tags: [Vitamin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The vitamin data ID
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
 *               current_condition: "Vitaminy"
 *               history_items:
 *                 - title: "Vitamin Checkup"
 *                   value: "April 2019"
 *     responses:
 *       200:
 *         description: Vitamin data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vitamin'
 *       404:
 *         description: Vitamin data not found
 *       400:
 *         description: Bad request
 */
router.put('/vitamin/:id', vitaminController.updateVitamin);

/**
 * @swagger
 * /api/vitamin/{id}:
 *   delete:
 *     summary: Delete vitamin data
 *     tags: [Vitamin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The vitamin data ID
 *     responses:
 *       200:
 *         description: Vitamin data deleted successfully
 *       404:
 *         description: Vitamin data not found
 */
router.delete('/vitamin/:id', vitaminController.deleteVitamin);

module.exports = router;