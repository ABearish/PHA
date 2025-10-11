const mongoose = require("mongoose");
require('dotenv').config();

const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/PHA'; 

mongoose.connect(dbUrl, {
  useUnifiedTopology: true,  
  useNewUrlParser: true,
})
.then(() => console.log('✅ MongoDB connection established successfully.'))
.catch(err => console.error('❌ MongoDB connection error:', err));


// --- Schema Definition ---
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

const Pha = mongoose.model('PHA', phaSchema, 'asteriods'); 

module.exports = {
  Pha,
  mongoose
};
