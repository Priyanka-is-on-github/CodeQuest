const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Admin collection
    required: true,
    ref: "Admin", // Establish relationship with Admin schema
    default: '1'
  },
  testName: {
    type: String, // Example: "Internship for Frontend Role"
    required: true,
    trim: true,
  },
  testDuration: {
    type: String, // Duration in minutes (e.g., 60 for 1 hour)
    required: true,
  },

  totalQuestions: {
    type: Number,
    default: 3, // Default number of questions is 3
  },
  startDateTime: {
    type: Date, // Stores combined start date and time
    required: true,
  },
  endDateTime: {
    type: Date, // Stores combined end date and time
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set update date
  },
});

// Pre-save hook to update `updatedAt`
testSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
