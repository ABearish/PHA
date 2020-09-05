const { Pha, addPHA } = require("../db/index");

const retrieve = async () => {
  const threeDay = new Date();
  threeDay.setDate(threeDay.getDate() + 3);
  return Pha.aggregate([
    {
      $match: {
        date: {
          $gt: new Date(Date.now()),
          $lte: threeDay,
        },
      },
    },
  ])
    .sort("date")
    .exec()
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return err;
    });
};

const retrieveCustom = async (start, end) => {
  return Pha.aggregate([
    {
      $match: {
        date: {
          $gt: new Date(start),
          $lte: new Date(end),
        },
      },
    },
  ])
    .sort("date")
    .exec()
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return err;
    });
};

const getYTD = () => {
  return Pha.aggregate([
    {
      $match: {
        date: {
          $gt: new Date("Wed, 01 Jan 2020 00:00:00 GMT"),
          $lte: new Date(Date.now()),
        },
      },
    },
    {
      $count: "date",
    },
  ])
    .exec()
    .then((results) => {
      return results;
    })
    .catch((error) => {
      return 0;
    });
};

module.exports = {
  addPHA,
  retrieve,
  getYTD,
  retrieveCustom,
};
