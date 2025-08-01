const express = require('express');
const Example = require('../models/example');
const TestCasesModel = require('../models/testcases');

const router = express.Router()

router.post('/', async(req, res)=>{

    const {questionId} = req.query;
    
   const {testcase}= req.body;

try {
        // Validate input
        if (!questionId || !testcase || !Array.isArray(testcase)) {
            return res.status(400).json({ 
                success: false, 
                msg: 'questionId and testcase array are required' 
            });
        }

        // Create the document
        const newTestcase= await TestCasesModel.create({
            questionId,
            testcase: testcase // Note: field name must match your schema ('example' not 'testcase')
        });

        res.status(201).json({
            success: true,
            msg: 'Successfully created',
            data: newTestcase
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error',
            error: error.message
        });
    }

})

module.exports = router;