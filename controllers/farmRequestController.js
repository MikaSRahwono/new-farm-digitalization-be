// controllers/farmRequestController.js
const { 
    createFarmRequest, 
    getPendingRequests, 
    acceptRequest, 
    rejectRequest 
  } = require('../services/farmRequestService');
  
  /**
   * Controller to handle creating a farm request.
   */
  const createRequest = async (req, res) => {
    try {
      const { farmId, operatorId } = req.body;
      const request = await createFarmRequest(farmId, operatorId);
      res.status(201).json(request);
    } catch (error) {
      res.status(500).json({ message: 'Error creating farm request', error });
    }
  };
  
  /**
   * Controller to fetch all pending farm requests.
   */
  const getAllPendingRequests = async (req, res) => {
    try {
      const { operatorId } = req.query;
      const requests = await getPendingRequests(operatorId ? Number(operatorId) : null); // Pass operatorId to the service
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching requests', error });
    }
  };
  
  
  /**
   * Controller to accept a farm request.
   */
  const acceptFarmRequest = async (req, res) => {
    try {
      const requestId = req.params.id;
      const farm = await acceptRequest(requestId);
      if (!farm) return res.status(404).json({ message: 'Request not found or already processed' });
  
      res.status(200).json(farm);
    } catch (error) {
      res.status(500).json({ message: 'Error accepting request', error });
    }
  };
  
  /**
   * Controller to reject a farm request.
   */
  const rejectFarmRequest = async (req, res) => {
    try {
      const requestId = req.params.id;
      const result = await rejectRequest(requestId);
      if (!result) return res.status(404).json({ message: 'Request not found or already processed' });
  
      res.status(200).json({ message: 'Request rejected successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error rejecting request', error });
    }
  };
  
  module.exports = {
    createRequest,
    getAllPendingRequests,
    acceptFarmRequest,
    rejectFarmRequest,
  };
  