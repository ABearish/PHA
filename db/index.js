const mongoose = require("mongoose");
require('dotenv').config();

// CRITICAL FIX: Use the secure MONGO_URI environment variable
const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/PHA'; 
// If MONGO_URI is defined (by Docker Compose), use it. Otherwise, fall back to localhost.

// Connect to MongoDB
mongoose.connect(dbUrl, {
  // These options are now default in modern Mongoose and can often be omitted, 
  // but it's good practice to ensure compatibility.
  useUnifiedTopology: true,  
  useNewUrlParser: true,
})
.then(() => console.log('✅ MongoDB connection established successfully.'))
.catch(err => console.error('❌ MongoDB connection error:', err));


// --- Schema Definition ---

const phaSchema = mongoose.Schema({
  id:  {type: Number, unique: true}, // Ensures no duplicate asteroid IDs
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

// The model is named 'PHA' and uses the collection 'phas'
const Pha = mongoose.model('PHA', phaSchema, 'phas'); 

module.exports = {
  Pha,
  mongoose
};
