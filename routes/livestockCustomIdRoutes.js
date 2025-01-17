const express = require('express');
const LivestockCustomIdController = require('../controllers/livestockCustomIdController');

const router = express.Router();

/**
 * @swagger
 * /api/livestock-custom-ids/{farmId}/{typeId}:
 *   get:
 *     summary: Get a custom ID by farm ID and type ID
 *     tags:
 *       - Livestock Custom IDs
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the farm
 *       - in: path
 *         name: typeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the livestock type
 *     responses:
 *       200:
 *         description: Custom ID retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 farm_id:
 *                   type: integer
 *                 type_id:
 *                   type: string
 *                 custom_prefix:
 *                   type: string
 *                 last_number:
 *                   type: integer
 *       404:
 *         description: Custom ID not found
 */
router.get('/:farmId/:typeId', LivestockCustomIdController.getCustomIdByFarmAndType);

/**
 * @swagger
 * /api/livestock-custom-ids/create:
 *   post:
 *     summary: Create a new custom ID
 *     tags:
 *       - Livestock Custom IDs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - farmId
 *               - typeId
 *               - customPrefix
 *             properties:
 *               farmId:
 *                 type: integer
 *                 description: The ID of the farm
 *               typeId:
 *                 type: string
 *                 description: The ID of the livestock type
 *               customPrefix:
 *                 type: string
 *                 description: The custom prefix for the ID
 *     responses:
 *       201:
 *         description: Custom ID created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create', LivestockCustomIdController.createCustomId);

/**
 * @swagger
 * /api/livestock-custom-ids/increment:
 *   post:
 *     summary: Increment the last number for a custom ID
 *     tags:
 *       - Livestock Custom IDs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - farmId
 *               - typeId
 *             properties:
 *               farmId:
 *                 type: integer
 *                 description: The ID of the farm
 *               typeId:
 *                 type: string
 *                 description: The ID of the livestock type
 *     responses:
 *       200:
 *         description: Last number incremented successfully
 *       404:
 *         description: Custom ID not found
 */
router.post('/increment', LivestockCustomIdController.incrementLastNumber);

/**
 * @swagger
 * /api/livestock-custom-ids/changePrefix:
 *   put:
 *     summary: Change the custom prefix and reset last_number to 0
 *     tags:
 *       - Livestock Custom IDs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - farmId
 *               - typeId
 *               - newPrefix
 *             properties:
 *               farmId:
 *                 type: integer
 *                 description: The ID of the farm
 *               typeId:
 *                 type: string
 *                 description: The ID of the livestock type
 *               newPrefix:
 *                 type: string
 *                 description: The new custom prefix
 *     responses:
 *       200:
 *         description: Prefix updated successfully and last_number reset to 0
 *       404:
 *         description: Custom ID not found
 *       500:
 *         description: Internal server error
 */
router.put('/changePrefix', LivestockCustomIdController.changePrefix);

module.exports = router;
