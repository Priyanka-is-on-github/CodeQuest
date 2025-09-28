const express = require("express");


const router = express.Router();


const { Developersignup, Developersignin, VerifyEmail, ResendVerificationCode } = require("../controllers/AuthController");
const {signinValidation, RecruiterValidation} = require("../middlewares/signinValidation");
const SearchCompanies = require("../controllers/SearchCompanies");
const {CreateCompanies, VerifyCompany} = require("../controllers/CreateCompanies");
const { RecruiterSignin, RecruiterSignup} = require("../controllers/RecruiterSignup");



router.post('/signup', Developersignup)
router.post('/verifyemail', VerifyEmail)
router.post('/resendCode', ResendVerificationCode)
router.post('/signin', signinValidation, Developersignin)

router.get('/search', SearchCompanies);
router.post('/create', CreateCompanies);
router.post('/verifyCompany', VerifyCompany);


router.post('/createAccount', RecruiterSignup);
router.post('/recruitersignIn',RecruiterValidation, RecruiterSignin);






module.exports = router;
