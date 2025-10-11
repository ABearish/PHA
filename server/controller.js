const models = require("./models");

module.exports = {
  // Retrieve PHAs due within 3 days
  getPha: async (req, res) => {
    try {
      const results = await models.retrieve();
      res.status(200).json(results);
    } catch (error) {
      console.error("CONTROLLER ERROR (getPha):", error.message);
      // Crucial: Respond with 500 status on internal error
      res.status(500).json({ error: "Failed to retrieve near-earth objects." }); 
    }
  },

  // Get count of PHAs year-to-date
  getPhaYTD: async (req, res) => {
    try {
      const results = await models.getYTD();
      res.status(200).json(results);
    } catch (error) {
      console.error("CONTROLLER ERROR (getPhaYTD):", error.message);
      res.status(500).json({ error: "Failed to retrieve year-to-date count." });
    }
  },

  // Retrieve PHAs within a custom range
  getCustom: async (req, res) => {
    const { start, end } = req.params; 
    
    try {
      const results = await models.retrieveCustom(start, end);
      res.status(200).json(results);
    } catch (error) {
      console.error("CONTROLLER ERROR (getCustom):", error.message);
      res.status(500).json({ error: "Failed to retrieve custom range data." });
    }
  }
};
