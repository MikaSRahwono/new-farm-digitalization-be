const { FarmRequest, Farm, User } = require('../models');

/**
 * Create a farm request.
 * @param {Object} farmId - The data for the farm request.
 * @param {number} operatorId - The ID of the farm owner.
 * @returns {Promise<Object>} The created farm request.
 */
const createFarmRequest = async (farmId, email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('User not found');
    }

    const operatorId = user.id;


    return await FarmRequest.create({ farmId, operatorId });
};

/**
 * Get all pending farm requests.
 * @returns {Promise<Array>} A list of pending farm requests.
 */
const getPendingRequests = async (operatorId) => {
    return await FarmRequest.findAll({
      where: {
        status: 'PENDING',
        operatorId: operatorId,
      },
      include: [
        {
            model: Farm,
            as: 'farm',
            required: false,
        },
        {
            model: User,
            as: 'operator',
            required: false,
        }
      ],
    });
  };

/**
 * Accept a farm request.
 * @param {number} requestId - The ID of the farm request to accept.
 * @returns {Promise<Object|null>} The created farm or null if the request is not found.
 */
const acceptRequest = async (requestId) => {
    const request = await FarmRequest.findByPk(requestId);

    console.log(1)
  
    if (!request || request.status !== 'PENDING') return null;
    console.log(1)
    const farm = await Farm.findByPk(request.farmId);
    console.log(request.operatorId)
    const operator = await User.findByPk(request.operatorId)
    console.log(operator)
    await farm.addOperators(operator);
    console.log(1)
    await request.update({ status: 'ACCEPTED' });
    console.log(1)

    return request;
  };

/**
 * Reject a farm request.
 * @param {number} requestId - The ID of the farm request to reject.
 * @returns {Promise<boolean>} True if the request was rejected, false if not found.
 */
const rejectRequest = async (requestId) => {
  const request = await FarmRequest.findByPk(requestId);
  if (!request || request.status !== 'PENDING') return false;

  await request.update({ status: 'REJECTED' });
  return true;
};

module.exports = {
  createFarmRequest,
  getPendingRequests,
  acceptRequest,
  rejectRequest,
};
