const express = require("express");


const router = express.Router();


const { Developersignup, Developersignin, VerifyEmail, ResendVerificationCode } = require("../controllers/AuthController");
const {signinValidation, RecruiterValidation} = require("../middlewares/signinValidation");
const SearchCompanies = require("../controllers/SearchCompanies");
const {CreateCompanies, VerifyCompany} = require("../controllers/CreateCompanies");
const {RecruiterSignup, RecruiterSignin} = require("../controllers/RecruiterSignup");



router.post('/signup', Developersignup)
router.post('/verifyemail', VerifyEmail)
router.post('/resendCode', ResendVerificationCode)
router.post('/signin', signinValidation, Developersignin)

router.get('/search', SearchCompanies);
router.post('/create', CreateCompanies);
router.post('/verifyCompany', VerifyCompany);


router.post('/createAccount', RecruiterSignup);
router.post('/recruitersignIn',RecruiterValidation, RecruiterSignin);





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
