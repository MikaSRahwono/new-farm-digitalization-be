// routes/farmRequestRoutes.js
const express = require('express');
const {
  createRequest,
  getAllPendingRequests,
  acceptFarmRequest,
  rejectFarmRequest,
} = require('../controllers/farmRequestController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FarmRequests
 *   description: API for managing farm requests
 */

/**
 * @swagger
 * /api/farm-requests:
 *   post:
 *     summary: Create a new farm request
 *     tags: [FarmRequests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: integer
 *             properties:
 *               farmId:
 *                 type: integer
 *                 description: Farm id to be requested
 *               operatorId:
 *                 type: integer
 *                 description: ID of the farm owner
 *             example:
 *               farmId: 2
 *               operatorId: 1
 *     responses:
 *       201:
 *         description: Farm request created successfully
 *       500:
 *         description: Error creating farm request
 */
router.post('/', createRequest);

/**
 * @swagger
 * /api/farm-requests/pending:
 *   get:
 *     summary: Get all pending farm requests
 *     tags: [FarmRequests]
 *     parameters:
 *       - in: query
 *         name: operatorId
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the operator to filter pending requests
 *     responses:
 *       200:
 *         description: List of pending requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   farmId:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   operatorId:
 *                     type: integer
 *                 example:
 *                   id: 1
 *                   farmId: 2
 *                   status: "PENDING"
 *                   operatorId: 1
 *       500:
 *         description: Error fetching requests
 */
router.get('/pending', getAllPendingRequests);

/**
 * @swagger
 * /api/farm-requests/{id}/accept:
 *   post:
 *     summary: Accept a pending farm request
 *     tags: [FarmRequests]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the farm request to accept
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Farm request accepted successfully
 *       404:
 *         description: Request not found or already processed
 *       500:
 *         description: Error accepting request
 */
router.post('/:id/accept', acceptFarmRequest);

/**
 * @swagger
 * /api/farm-requests/{id}/reject:
 *   post:
 *     summary: Reject a pending farm request
 *     tags: [FarmRequests]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the farm request to reject
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Request rejected successfully
 *       404:
 *         description: Request not found or already processed
 *       500:
 *         description: Error rejecting request
 */
router.post('/:id/reject', rejectFarmRequest);

module.exports = router;
