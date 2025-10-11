const axios = require("axios");

// Assuming the db setup file exports Pha model and mongoose connection
const { Pha, mongoose } = require("../db/index"); 

// --- Helper Function: Implements Promise-based delay for reliable retries ---
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches PHA data from NASA API for a 7-day period with retry logic.
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Promise<Array>} Array of saved PHA documents or a promise for a retry.
 */
require('dotenv').config({path:"../.env"}); 

const API_KEY = process.env.NASA_API_KEY; 

const getPHAFrApi = async (startDate, endDate) => {
  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
  console.log(apiUrl)
  const maxRetries = 3;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await axios.get(apiUrl);
      const nearEarthObjects = response.data["near_earth_objects"];

      // 1. Get all dates (keys) from the response data
      const dates = Object.keys(nearEarthObjects);

      // 2. Use Promise.all and flatMap to process all dates in parallel
      // and flatten the result into one array of promises
      const promises = dates.flatMap(date => {
        // Find and process potentially hazardous asteroids for the current date
        return findAndProcessPHAs(nearEarthObjects[date], date);
      });

      // 3. Await all saving promises and return the final results
      const results = await Promise.all(promises);
      return results.filter(result => result && result !== 'error'); // Filter out null/errors

    } catch (err) {
      attempts++;
      const status = err.response ? err.response.status : 'Network Error';
      const statusText = err.response ? err.response.statusText : 'Unknown';

      console.log(
        `[ATTEMPT ${attempts}/${maxRetries}] Failed: ${status} - ${statusText}. Retrying in 2 seconds...`,
        `Dates: ${startDate} to ${endDate}`
      );
      
      // If we are at the last attempt, throw the error to halt the process
      if (attempts === maxRetries) {
        console.error(`Max retries reached for ${startDate}. Aborting.`);
        throw new Error(`Failed to fetch data after ${maxRetries} attempts.`);
      }

      // Delay execution before the next loop iteration (retry)
      await delay(2000); 
    }
  }
};

/**
 * Iterates through a list of NEOs for a specific date and saves PHAs to the database.
 * Uses map to create an array of promises for concurrent database saving.
 * @param {Array} neoArr - Array of Near Earth Objects for one day.
 * @param {string} date - Date string for the observation.
 * @returns {Array<Promise>} Array of promises for the addPHA function.
 */
const findAndProcessPHAs = (neoArr, date) => {
  return neoArr.map(neo => {
    if (neo.is_potentially_hazardous_asteroid) {
      const phaData = {
        date: date,
        results: neo
      };
      return addPHA(phaData);
    }
    // Return null for non-hazardous objects
    return null;
  }).filter(p => p); // Filter out null values before returning the array of promises
};


/**
 * Converts raw API data into a Mongoose model and saves it.
 * @param {Object} phaData - Processed data containing the NEO and date.
 * @returns {Promise<Object|string>} Mongoose saved instance or an error string.
 */
const addPHA = async (phaData) => {
  console.log(phaData)
  // Using destructuring and null-checking for safer property access
  const { results, date } = phaData;

  if (Object.values(results).length) {
    const phaInstance = new Pha({
      id: parseInt(results.id),
      neo_id: parseInt(results.neo_reference_id),
      name: results.name,
      info: results.nasa_jpl_url,
      date: new Date(date),
      // Clean, explicit float parsing and fixed-point conversion
      est_diameter_min: parseFloat(
        results.estimated_diameter.feet.estimated_diameter_min
      ).toFixed(0),
      est_diameter_max: parseFloat(
        results.estimated_diameter.feet.estimated_diameter_max
      ).toFixed(0),
      velocity: parseFloat(
        results.close_approach_data[0].relative_velocity.miles_per_hour
      ).toFixed(0),
      // NOTE: Orbiting body is likely 'close_approach_data[0].orbiting_body'
      orbiting_body: results.close_approach_data[0].orbiting_body, 
      miss_distance: parseFloat(
        results.close_approach_data[0].miss_distance.lunar
      ).toFixed(0),
      is_sentry_object: results.is_sentry_object,
    });
    
    // Save to the database
    return phaInstance.save().catch((dbError) => {
      console.error(`[DB ERROR] Could not save NEO ID ${results.neo_reference_id}: ${dbError.message}`);
      return "error"; // Return an error identifier to be filtered later
    });
  }
};

// --- Execution Loop ---

const populateDataBase = async () => {
  console.log("Starting NASA NEO data population...");
  let year = 2025;
  let days = 1;
  let month = 0; 
  let promised = [];

  while (new Date(year, month, days).getFullYear() === 2025) {
    const start = new Date(year, month, days);
    // NASA API only allows a 7-day period
    const end = new Date(year, month, days + 7);
    
    // Check if the end date crosses into 2023, and adjust the loop exit logic if necessary
    if (start.getFullYear() !== year) break; 
    
    const startDateString = start.toISOString().slice(0, 10);
    const endDateString = end.toISOString().slice(0, 10);

    // Push the promise returned by the async function
    promised.push(getPHAFrApi(startDateString, endDateString));

    // Move to the next 8-day block
    days += 8; 
  }

  try {
    // Wait for all 7-day API calls and subsequent database saves to complete
    await Promise.all(promised);
    console.log("DONE: All data successfully fetched and saved.");
    // Close the connection only after all promises have resolved
    mongoose.connection.close(); 
    process.exit(0);
  } catch (err) {
    console.error("POPULATE ERROR:", err.message);
    process.exit(1); // Exit with a non-zero code to signal failure
  }
};
populateDataBase()