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
    const { farmId, email } = req.body;

    try {
        const request = await createFarmRequest(farmId, email);
        
        res.status(201).json({success: true, data: request});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating farm request', error });
    }
};
  
  /**
   * Controller to fetch all pending farm requests.
   */
  const getAllPendingRequests = async (req, res) => {
    try {
      const { operatorId } = req.query;
      const requests = await getPendingRequests(operatorId ? Number(operatorId) : null); // Pass operatorId to the service
      res.status(200).json({success: true, data: requests});
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching requests', error });
    }
  };
  
  
  /**
   * Controller to accept a farm request.
   */
  const acceptFarmRequest = async (req, res) => {
    try {
      const requestId = req.params.id;
      const farm = await acceptRequest(requestId);
      if (!farm) return res.status(404).json({ success: false, message: 'Request not found or already processed' });
  
      res.status(200).json({success: true, data: farm});
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error accepting request', error });
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
  
      res.status(200).json({ success: true, message: 'Request rejected successfully' });
    } catch (error) {
      res.status(500).json({success: false,  message: 'Error rejecting request', error });
    }
  };
  
  module.exports = {
    createRequest,
    getAllPendingRequests,
    acceptFarmRequest,
    rejectFarmRequest,
  };
  