// routes/vaccineRoutes.js
const express = require('express');
const router = express.Router();
const vaccineController = require('../controllers/vaccineController');

/**
 * @swagger
 * tags:
 *   name: Vaccine
 *   description: API for managing vaccine data  
 */

/**
 * @swagger
 * /api/animals/{animalId}/vaccine:
 *   post:
 *     summary: Create vaccine data for an animal
 *     tags: [Vaccine]
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
 *                 description: Current vaccine condition
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
 *               current_condition: "Vacciney"
 *               animalId: 1
 *               history_items:
 *                 - title: "Vaccine Checkup"
 *                   value: "March 2019"
 *                 - title: "Vaccination"
 *                   value: "May 2019"
 *     responses:
 *       201:
 *         description: Vaccine data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaccine'
 *       400:
 *         description: Bad request
 */
router.post('/animals/:animalId/vaccine', vaccineController.createVaccine);

/**
 * @swagger
 * /api/animals/{animalId}/vaccine:
 *   get:
 *     summary: Get vaccine data for an animal
 *     tags: [Vaccine]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The animal ID
 *     responses:
 *       200:
 *         description: Vaccine data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaccine'
 *       404:
 *         description: Vaccine data not found
 */
router.get('/animals/:animalId/vaccine', vaccineController.getVaccineByAnimalId);

/**
 * @swagger
 * /api/vaccine/{id}:
 *   put:
 *     summary: Update vaccine data
 *     tags: [Vaccine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The vaccine data ID
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
 *               current_condition: "Vacciney"
 *               history_items:
 *                 - title: "Vaccine Checkup"
 *                   value: "April 2019"
 *     responses:
 *       200:
 *         description: Vaccine data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaccine'
 *       404:
 *         description: Vaccine data not found
 *       400:
 *         description: Bad request
 */
router.put('/vaccine/:id', vaccineController.updateVaccine);

/**
 * @swagger
 * /api/vaccine/{id}:
 *   delete:
 *     summary: Delete vaccine data
 *     tags: [Vaccine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The vaccine data ID
 *     responses:
 *       200:
 *         description: Vaccine data deleted successfully
 *       404:
 *         description: Vaccine data not found
 */
router.delete('/vaccine/:id', vaccineController.deleteVaccine);

module.exports = router;