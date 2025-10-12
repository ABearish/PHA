const mongoose = require("mongoose");
require('dotenv').config();

const db_url = process.env.MONGO_URI || 'mongodb://localhost:27017/PHA'; 

mongoose.connect(db_url)
.then(() => console.log('✅ MongoDB connection established successfully.'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// --- Schema Definition ---
const pha_schema = mongoose.Schema({
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

const Pha = mongoose.model('PHA', pha_schema, 'asteriods'); 

module.exports = {
  Pha,
  mongoose
};
