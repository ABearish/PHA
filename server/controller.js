const models = require("./models");

module.exports = {
  getPha: (req, res) => {
    return models
      .retrieve()
      .then((results) => {
        res.json(results);
      })
      .catch((error) => {
        res.status(500);
      });
  },
  getPhaYTD: (req, res) => {
    return models.getYTD()
    .then((results) => {
      res.json(results);      
    })
    .catch((error) => {
      return error
    })
  },
  getCustom: (req, res) => {
    const {start, end} = (req.params);
    return models
    .retrieveCustom(start, end)
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      res.status(500);
    });
  }
};
