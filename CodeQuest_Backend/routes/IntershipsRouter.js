const express = require('express');
const {IntershipsController, getInternships, getInternshipLogo} = require('../controllers/IntershipsController');

const router = express.Router();


router.post('/create', IntershipsController);
router.get('/getinternships', getInternships);
router.get('/getinternshipLogo', getInternshipLogo);

module.exports = router;