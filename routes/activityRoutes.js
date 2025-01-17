const express = require('express');
const activityController = require('../controllers/activityController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Manage activities related to farms
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         user:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *         changes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               what:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *         farmId:
 *           type: integer
 *     ActivityResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         error:
 *           type: string
 */

/**
 * @swagger
 *  /api/activities:
 *    post:
 *      summary: Add a new activity
 *      tags: [Activities]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Activity'
 *      responses:
 *        201:
 *          description: Activity added successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ActivityResponse'
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', activityController.addActivityController);

/**
 * @swagger
 *  /api/activities/farms/{farmId}:
 *    get:
 *      summary: Get all activities for a specific farm
 *      tags: [Activities]
 *      parameters:
 *        - name: farmId
 *          in: path
 *          required: true
 *          description: ID of the farm
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Activities retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/farms/:farmId', activityController.getAllActivitiesController);

module.exports = router;
