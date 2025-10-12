const axios = require("axios");
require('dotenv').config({path:"../.env"}); 
const json_data = require('../db/data/data.json') || []

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
/**
 * Fetches PHA data from NASA API for a 7-day period with retry logic.
 * @param {string} start_date - Start date (YYYY-MM-DD)
 * @param {string} end_date - End date (YYYY-MM-DD)
 * @returns {Promise<Array>} Array of saved PHA documents or a promise for a retry.
*/

const { Pha, mongoose } = require("../db/index"); 
const get_pha_from_api = async (start_date, end_date) => {
const API_KEY = process.env.NASA_API_KEY; 
  
  if (!API_KEY && json_data) {
    console.log(`No API key given, will now attempt to populate database from JSON file`)
    add_pha_to_db(json_data)
    return;
  } 
  
  const api_url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`;
  const max_retries = 3;
  let attempts = 0;
  
  while (attempts < max_retries) {
    try {
      const response = await axios.get(api_url);
      const near_earth_objects = response.data["near_earth_objects"];
      const dates = Object.keys(near_earth_objects);
      const promises = dates.flatMap(date => {
        return find_and_process_phas(near_earth_objects[date], date);
      });

      const results = await Promise.all(promises);
      return results.filter(result => result && result !== 'error'); // Filter out null/errors

    } catch (err) {
      attempts++;
      const status = err.response ? err.response.status : 'Network Error';
      const status_text = err.response ? err.response.statusText : 'Unknown';
      console.log(
        `[ATTEMPT ${attempts}/${max_retries}] Failed: ${status} - ${status_text}. Retrying in 2 seconds...`,
        `Dates: ${start_date} to ${end_date}`
      );
      
      // we are at the last attempt, throw the error to halt the process
      if (attempts === max_retries) {
        console.error(`Max retries reached for ${start_date}. Aborting.`);
        throw new Error(`Failed to fetch data after ${max_retries} attempts.`);
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
const find_and_process_phas = (neoArr, date) => {
  return neoArr.map(neo => {
    if (neo.is_potentially_hazardous_asteroid) {
      const pha_data = {
        date: date,
        results: neo
      };
      return add_pha_to_db(pha_data);
    }
    // Return null for non-hazardous objects
    return null;
  }).filter(p => p); // Filter out null values before returning the array of promises
};


/**
 * Converts raw API data into a Mongoose model and saves it.
 * @param {Object} pha_data - Processed data containing the NEO and date.
 * @returns {Promise<Object|string>} Mongoose saved instance or an error string.
 */
const add_pha_to_db = async (pha_data) => {
  const { results, date } = pha_data;
  if (Object.values(results) !== undefined && Object.values(results).length) {
    const pha_instance = new Pha({
      id: parseInt(results.id),
      neo_id: parseInt(results.neo_reference_id),
      name: results.name,
      info: results.nasa_jpl_url,
      date: new Date(date),
     
      est_diameter_min: parseFloat(
        results.estimated_diameter.feet.estimated_diameter_min
      ).toFixed(0),
     
      est_diameter_max: parseFloat(
        results.estimated_diameter.feet.estimated_diameter_max
      ).toFixed(0),
     
      velocity: parseFloat(
        results.close_approach_data[0].relative_velocity.miles_per_hour
      ).toFixed(0),
     
      orbiting_body: results.close_approach_data[0].orbiting_body, 
      miss_distance: parseFloat(
        results.close_approach_data[0].miss_distance.lunar
      ).toFixed(0),
      is_sentry_object: results.is_sentry_object,
    });
    
    // Save to the database
    return pha_instance.save().catch((dbError) => {
      console.error(`[DB ERROR] Could not save NEO ID ${results.neo_reference_id}: ${dbError.message}`);
      return "error"; // Return an error identifier to be filtered later
    });
  }
};

// --- Execution Loop ---
const populate_datebase = async () => {
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
    const start_date_string = start.toISOString().slice(0, 10);
    const end_date_string = end.toISOString().slice(0, 10);

    // Push the promise returned by the async function
    promised.push(get_pha_from_api(start_date_string, end_date_string));
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
populate_datebase()

module.exports = {add_pha_to_db}