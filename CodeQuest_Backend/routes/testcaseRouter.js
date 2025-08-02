const express = require('express');

const TestCasesModel = require('../models/testcases');
const { Types } = require('mongoose');

const router = express.Router()

router.post('/', async(req, res)=>{

 
    const {questionId} = req.query;
    
   const {testcases}= req.body;
   

try {
        // Validate input
        if (!questionId || !testcases || !Array.isArray(testcases)) {
            return res.status(400).json({ 
                success: false, 
                msg: 'questionId and testcase array are required' 
            });
        }

         // Delete existing examples for this question
            await TestCasesModel.deleteMany({ questionId });

       // Insert new examples
           const createdTestcases = await TestCasesModel.insertMany(
             testcases.map(testcase => ({
               questionId,
               ...testcase
             }))
           );




        res.status(201).json({
            success: true,
            msg: 'Successfully created',
            testcases: createdTestcases
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



// Delete an example
router.delete('/', async (req, res) => {
  try {
   
  const { questionId , id} = req.query;
  
  
  await TestCasesModel.findByIdAndDelete(id);
  

const objectId = new Types.ObjectId(questionId);
const testcases = await TestCasesModel.find({ questionId: objectId });
   

   if (!testcases.length) {
      return res.status(200).json({ 
      success: true,
      message: 'testcases deleted successfully',
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'testcases deleted successfully',
      testcases:testcases
      
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;