// const express = require("express");
// const mongoose = require("mongoose");

// const router = express.Router();
// const Test = require("../models/test");
// const Admin = require("../models/admin");
// const { adminId } = require("../utils/constant");

// router.post("/", async (req, res) => {
//   const { testName, testDuration, startDate, endDate, startTime, endTime } =
//     req.body;
//   const startDateTime = new Date(`${startDate}T${startTime}`);
//   const endDateTime = new Date(`${endDate}T${endTime}`);

//   try {
//     const newTest = await Test.create({
//       adminId,
//       testName,
//       testDuration,
//       startDateTime,
//       endDateTime,
//     });

 

//     res.status(201).json({
//       message: "Test created successfully",
//     });
//   } catch (error) {
//     console.error("Error creating test:", error);

   
//     res.status(500).json({
//       message: "An error occurred while creating the test",
//       error: error.message,
//     });
//   }
// });

// router.get("/gettest", async (req, res) => {
//   try {
//     const getAllTest = await Test.find({});

//     const updatedAllNewTest = getAllTest.map((test) => {
//       const startDate = test.startDateTime.toISOString().split("T")[0];
//       const startTime = test.startDateTime
//         .toISOString()
//         .split("T")[1]
//         .slice(0, 5);

//       const endDate = test.endDateTime.toISOString().split("T")[0];
//       const endTime = test.endDateTime.toISOString().split("T")[1].slice(0, 5);

//       return { ...test.toObject(), startDate, startTime, endDate, endTime };
//     });

//     res.status(200).json(updatedAllNewTest);
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred while getting the test",
//       error: error.message,
//     });
//   }
// });
// module.exports = router;
