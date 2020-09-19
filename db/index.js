const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect( `mongodb://mongo:27017/PHA`, {
  useUnifiedTopology: true, 
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const phaSchema = mongoose.Schema({
  id:  {type: Number, unique: true},
  neo_id: Number,
  name: String,
  info: String,
  date: Date,
  est_diameter_min: Number,
  est_diameter_max: Number,
  velocity: Number,
  orbiting_body: String,
  miss_distance: Number,
  is_sentry_object: Boolean,
});

const Pha = mongoose.model('PHA', phaSchema, 'phas'); 

module.exports = {
  Pha,
  mongoose
};
