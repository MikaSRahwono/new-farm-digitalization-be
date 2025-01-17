// routes/statisticsRoutes.js

const express = require('express');
const statisticsController = require('../controllers/statisticsController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: API to get statistics for animals (Cow, Goat, Sheep)
 */

/**
 * @swagger
 *  /api/statistics/cow-statistics:
 *    get:
 *      summary: Get statistics for cows in a specific farm
 *      tags: [Statistics]
 *      parameters:
 *        - name: farmId
 *          in: query
 *          required: true
 *          description: The farm ID to filter the statistics
 *          schema:
 *            type: integer
 *            example: 1
 *      responses:
 *        200:
 *          description: Statistics for cows in the specified farm
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  total:
 *                    type: integer
 *                    example: 100
 *                  totalMale:
 *                    type: integer
 *                    example: 60
 *                  totalFemale:
 *                    type: integer
 *                    example: 40
 *                  malePhaseStats:
 *                    type: object
 *                    example: { "phase1": 30, "phase2": 30 }
 *                  femalePhaseStats:
 *                    type: object
 *                    example: { "phase1": 20, "phase2": 20 }
 *                  livestockConditionStats:
 *                    type: object
 *                    example: { "healthy": 90, "sick": 10 }
 *        500:
 *          description: Internal server error
 */
router.get('/cow-statistics', statisticsController.getCowStatistics);

/**
 * @swagger
 *  /api/statistics/goat-statistics:
 *    get:
 *      summary: Get statistics for goats in a specific farm
 *      tags: [Statistics]
 *      parameters:
 *        - name: farmId
 *          in: query
 *          required: true
 *          description: The farm ID to filter the statistics
 *          schema:
 *            type: integer
 *            example: 2
 *      responses:
 *        200:
 *          description: Statistics for goats in the specified farm
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  total:
 *                    type: integer
 *                    example: 50
 *                  totalMale:
 *                    type: integer
 *                    example: 30
 *                  totalFemale:
 *                    type: integer
 *                    example: 20
 *                  malePhaseStats:
 *                    type: object
 *                    example: { "phase1": 15, "phase2": 15 }
 *                  femalePhaseStats:
 *                    type: object
 *                    example: { "phase1": 10, "phase2": 10 }
 *                  livestockConditionStats:
 *                    type: object
 *                    example: { "healthy": 45, "sick": 5 }
 *        500:
 *          description: Internal server error
 */
router.get('/goat-statistics', statisticsController.getGoatStatistics);

/**
 * @swagger
 *  /api/statistics/sheep-statistics:
 *    get:
 *      summary: Get statistics for sheep in a specific farm
 *      tags: [Statistics]
 *      parameters:
 *        - name: farmId
 *          in: query
 *          required: true
 *          description: The farm ID to filter the statistics
 *          schema:
 *            type: integer
 *            example: 3
 *      responses:
 *        200:
 *          description: Statistics for sheep in the specified farm
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  total:
 *                    type: integer
 *                    example: 70
 *                  totalMale:
 *                    type: integer
 *                    example: 40
 *                  totalFemale:
 *                    type: integer
 *                    example: 30
 *                  malePhaseStats:
 *                    type: object
 *                    example: { "phase1": 20, "phase2": 20 }
 *                  femalePhaseStats:
 *                    type: object
 *                    example: { "phase1": 15, "phase2": 15 }
 *                  livestockConditionStats:
 *                    type: object
 *                    example: { "healthy": 65, "sick": 5 }
 *        500:
 *          description: Internal server error
 */
router.get('/sheep-statistics', statisticsController.getSheepStatistics);

module.exports = router;
