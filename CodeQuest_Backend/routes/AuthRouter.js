const express = require("express");
const bcrypt = require("bcrypt");
const { setUser } = require("../service/auth");

const router = express.Router();
const UserModel = require("../models/user");
const { signupValidation, signinValidation } = require("../middlewares/Email.config");
const { signup, signin } = require("../controllers/AuthController");



router.post('/signup', signupValidation, signup)

router.post('/signin', signinValidation, signin)


// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ msg: "Email and password are required" });
//   }

//   try {
//     const user = await UserModel.findOne({ email });

//     console.log("user=", user);

//     if (!user) {
//       return res.status(401).json({ msg: "invalid user and password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("m=", isMatch);

//     if (!isMatch) {
//       return res.status(401).json({ msg: "invalid user and password" });
//     }

//     const token = setUser({ email, password });

//     res.cookie("authToken", token, {
//       httpOnly: true,
//       maxAge: 3600000,
//       secure: false,
//       sameSite: "lax",
//     });

//     return res.status(200).json({ msg: "user logedin successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ msg: " logedin failed" });
//   }
// });

// router.post('/logout', (req, res) => {
//     try {
//         // Clear the authToken cookie
//         res.clearCookie('authToken', { httpOnly: true, sameSite: 'lax', secure: false });
//         return res.status(200).json({ msg: 'User logged out successfully' });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ msg: 'Logout failed' });
//     }
// });


module.exports = router;
