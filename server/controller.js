const models = require("./models");

module.exports = {
  // Retrieve PHAs due within 3 days
  get_pha: async (req, res) => {
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
  get_pha_ytd: async (req, res) => {
    try {
      const results = await models.get_ytd();
      res.status(200).json(results);
    } catch (error) {
      console.error("CONTROLLER ERROR (getPhaYTD):", error.message);
      res.status(500).json({ error: "Failed to retrieve year-to-date count." });
    }
  },

  // Retrieve PHAs within a custom range
  get_custom_dates: async (req, res) => {
    const { start, end } = req.params; 
    
    try {
      const results = await models.retrieve_custom(start, end);
      res.status(200).json(results);
    } catch (error) {
      console.error("CONTROLLER ERROR (getCustom):", error.message);
      res.status(500).json({ error: "Failed to retrieve custom range data." });
    }
  }
};
