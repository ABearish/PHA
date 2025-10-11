const { Pha, addPHA } = require("../db/index");

const retrieve = async () => {
  try {
    const threeDay = new Date();
    // Get the date 3 days from now for the upper bound of the search
    threeDay.setDate(threeDay.getDate() + 3); 

    return await Pha.aggregate([
      {
        $match: {
          date: {
            $gt: new Date(Date.now()),
            $lte: threeDay,           
          },
        },
      },
      { $sort: { date: 1 } }, 
    ]);
  } catch (err) {
    console.error("MODEL ERROR (retrieve):", err);
    throw err; // Re-throw the error for the controller to catch and handle
  }
};

/**
 * Retrieves PHA data within a custom date range.
 * @param {string} start - Start date string.
 * @param {string} end - End date string.
 */

const retrieveCustom = async (start, end) => {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate) || isNaN(endDate)) {
        throw new Error("Invalid start or end date provided.");
    }

    return await Pha.aggregate([
      {
        $match: {
          date: {
            $gt: startDate,
            $lte: endDate,
          },
        },
      },
      { $sort: { date: 1 } },
    ]);
  } catch (err) {
    console.error("MODEL ERROR (retrieveCustom):", err);
    throw err;
  }
};

/**
 * Gets a count of all PHAs year-to-date (2025 to now).
 */
const getYTD = async () => {
  try {
    return await Pha.aggregate([
      {
        $match: {
          date: {
            // Your static start date for YTD 2025
            $gt: new Date("Sat, 01 Jan 2025 00:00:00 GMT"), 
            $lte: new Date(Date.now()),
          },
        },
      },
      {
        $count: "pha_count", // Use a descriptive field name
      },
    ]);
  } catch (err) {
    console.error("MODEL ERROR (getYTD):", err);
    throw err; 
  }
};

module.exports = {
  addPHA,
  retrieve,
  getYTD,
  retrieveCustom,
};
