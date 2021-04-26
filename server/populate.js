const axios = require("axios");
const { Pha, mongoose } = require("../db/index");

// API will only return 7 day periods /
const getPHAFrApi = async (startDate, endDate) => {
  const options = {
    url: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`,
  };
  return await axios
    .get(options.url)
    .then((results) => {
      let dates = Object.keys(results.data["near_earth_objects"]);
      const filteredResults = [];
      dates.forEach((ele) => {
        filteredResults.push(    pha.date = date;
          pha.results = ele;
          findPHA(results.data["near_earth_objects"][ele], ele)
        );
      });
      return filteredResults;
    })
    .then((phas) => {
      return phas;
    })
    .catch(async (err) => {
      console.log(
        "Retrying",
        err.response.status,
        err.response.statusText,
        "Dates:",
        startDate,
        endDate
      );
      const delayAPICall = () => {
        setTimeout(() => getPHAFrApi(startDate, endDate), 1000);
      };
      delayAPICall();
    });
};

const findPHA = async (arr, date) => {
  let pha = {};
  arr.forEach((ele) => {
    if (ele.is_potentially_hazardous_asteroid) {
      pha.date = date;
      pha.results = ele;
    }
  });
  return addPHA(pha);
};

const addPHA = async (phas) => {
  if (Object.values(phas).length) {
    const phaInstance = new Pha({
      id: parseInt(phas.results.id),
      neo_id: parseInt(phas.results.neo_reference_id),
      name: phas.results.name,
      info: phas.results.nasa_jpl_url,
      date: new Date(phas.date),
      est_diameter_min: parseFloat(
        phas.results.estimated_diameter.feet.estimated_diameter_min
      ).toFixed(0),
      est_diameter_max: parseFloat(
        phas.results.estimated_diameter.feet.estimated_diameter_max
      ).toFixed(0),
      velocity: parseFloat(
        phas.results.close_approach_data[0].relative_velocity.miles_per_hour
      ).toFixed(0),
      orbiting_body: phas.results.close_approach_data.orbiting_body,
      miss_distance: parseFloat(
        phas.results.close_approach_data[0].miss_distance.lunar
      ).toFixed(0),
      is_sentry_object: phas.results.is_sentry_object,
    });
    return phaInstance.save().catch(() => {
      return "error", phas;
    });
  }
};

const populateDataBase = () => {
  let year = 2021;
  let days = 01;
  let month = 00;
  let start = new Date(year, month, days);
  let end = new Date(year, month, days + 7);
  let promised = [];
  while (start.getFullYear() === 2021) {
    start = new Date(year, month, days);
    end = new Date(year, month, days + 7);
    promised.push(
      getPHAFrApi(
        start.toISOString().slice(0, 10),
        end.toISOString().slice(0, 10)
      )
    );
    days += 8;
  }
  return Promise.all(promised)
    .then(() => {
      console.log("done");
      mongoose.connection.close();
    })
    .then(() => process.exit())
    .catch((err) => console.log("pop", err));
};

populateDataBase();