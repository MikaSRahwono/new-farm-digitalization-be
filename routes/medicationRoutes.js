 // routes/medicationRoutes.js
const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

/**
 * @swagger
 * tags:
 *   name: Medication
 *   description: API for managing medication data  
 */

/**
 * @swagger
 * /api/animals/{animalId}/medication:
 *   post:
 *     summary: Create medication data for an animal
 *     tags: [Medication]
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
 *                 description: Current medication condition
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
 *               current_condition: "Medicationy"
 *               animalId: 1
 *               history_items:
 *                 - title: "Medication Checkup"
 *                   value: "March 2019"
 *                 - title: "Vaccination"
 *                   value: "May 2019"
 *     responses:
 *       201:
 *         description: Medication data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *       400:
 *         description: Bad request
 */
router.post('/animals/:animalId/medication', medicationController.createMedication);

/**
 * @swagger
 * /api/animals/{animalId}/medication:
 *   get:
 *     summary: Get medication data for an animal
 *     tags: [Medication]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The animal ID
 *     responses:
 *       200:
 *         description: Medication data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *       404:
 *         description: Medication data not found
 */
router.get('/animals/:animalId/medication', medicationController.getMedicationByAnimalId);

/**
 * @swagger
 * /api/medication/{id}:
 *   put:
 *     summary: Update medication data
 *     tags: [Medication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The medication data ID
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
 *               current_condition: "Medicationy"
 *               history_items:
 *                 - title: "Medication Checkup"
 *                   value: "April 2019"
 *     responses:
 *       200:
 *         description: Medication data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *       404:
 *         description: Medication data not found
 *       400:
 *         description: Bad request
 */
router.put('/medication/:id', medicationController.updateMedication);

/**
 * @swagger
 * /api/medication/{id}:
 *   delete:
 *     summary: Delete medication data
 *     tags: [Medication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The medication data ID
 *     responses:
 *       200:
 *         description: Medication data deleted successfully
 *       404:
 *         description: Medication data not found
 */
router.delete('/medication/:id', medicationController.deleteMedication);

module.exports = router;