const express = require('express');
const Example = require('../models/example');
const router = express.Router();
const { Types } = require('mongoose');

// Create or Update examples
router.post('/', async (req, res) => {
  try {
    const { questionId } = req.query;
    const { examples } = req.body;

    console.log(examples)

    if (!questionId || !examples || !Array.isArray(examples)) {
      return res.status(400).json({ 
        success: false, 
        message: 'questionId and examples array are required' 
      });
    }

    // Delete existing examples for this question
    // await Example.deleteMany({ questionId });

    // Insert new examples
    const createdExamples = await Example.insertMany(
      examples.map(example => ({
        questionId,
        ...example
      }))
    );

    res.status(200).json({
      success: true,
      examples: createdExamples
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete an example
router.delete('/', async (req, res) => {
  try {
   
  const { questionId , id} = req.query;
  
  
  await Example.findByIdAndDelete(id);
  

const objectId = new Types.ObjectId(questionId);
const examples = await Example.find({ questionId: objectId });
   

   
    res.status(200).json({ 
      success: true,
      message: 'Example deleted successfully',
      examples:examples
      
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