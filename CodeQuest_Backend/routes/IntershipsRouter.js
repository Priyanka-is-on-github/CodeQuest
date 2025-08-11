const express = require('express');
const {IntershipsController, getInternships, getInternshipLogo, putIspublished, deleteInternship, Internships, InternshipById} = require('../controllers/IntershipsController');

const router = express.Router();


router.post('/create', IntershipsController);
router.get('/getinternships', getInternships);
router.get('/getinternshipLogo', getInternshipLogo);
router.post('/putispublished', putIspublished);
router.get('/deleteinternship', deleteInternship);
router.get('/publishinternships', Internships);
router.get('/internshipid', InternshipById);

module.exports = router;