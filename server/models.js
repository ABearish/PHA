const { Pha, addPHA } = require("../db/index");

const retrieve = async () => {
  try {

    const today = new Date()

    return await Pha.aggregate([
      {
        $match: {
          date: {
            $gt: today    
          },
        },
      },
      { $sort: { date: 1 } },
      {$limit: 3} 
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

const retrieve_custom = async (start, end) => {
  try {
    const start_date = new Date(start);
    const end_date = new Date(end);

    if (isNaN(start_date) || isNaN(end_date)) {
        throw new Error("Invalid start or end date provided.");
    }

    return await Pha.aggregate([
      {
        $match: {
          date: {
            $gt: start_date,
            $lte: end_date,
          },
        },
      },
      { $sort: { date: 1 } },
    ]);
  } catch (err) {
    console.error("MODEL ERROR (retrieve_custom):", err);
    throw err;
  }
};

/**
 * Gets a count of all PHAs year-to-date (2025 to now).
 */
const get_ytd = async () => {
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
        $count: "pha_count",
      },
    ]);
  } catch (err) {
    console.error("MODEL ERROR (get_ytd):", err);
    throw err; 
  }
};

module.exports = {
  addPHA,
  retrieve,
  get_ytd,
  retrieve_custom,
};
