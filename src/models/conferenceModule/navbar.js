const mongoose = require("mongoose");

// Define your Mongoose schema based on the interface
const navbarSchema = new mongoose.Schema({
  confId: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
  },
  subHeading: {
    type: String,
  },
  url: {
    type: String,
  },
  name: {
    type: String,
  },
});

// Create the Mongoose model
const Navbar = mongoose.model("cf-navbar", navbarSchema);

module.exports = Navbar;
