const express = require('express');
const {IntershipsController, getInternships} = require('../controllers/IntershipsController');

const router = express.Router();


router.post('/create', IntershipsController);
router.get('/getinternships', getInternships);

module.exports = router;