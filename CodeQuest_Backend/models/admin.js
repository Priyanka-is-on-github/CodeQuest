const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
 
  adminName: {
    type: String,
    required: true,
    trim: true,
  },
  adminEmail: {
    type: String,
    required: true,
    //unique: true, // Ensures no duplicate admin emails
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Enforces minimum password length for security
  },
  designation: {
    type: String,
    enum: ["HR", "Tech"], // Restricts the designation to specific roles
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically adds the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically adds the updated date
  },
});

// Pre-save hook to update `updatedAt`
adminSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
