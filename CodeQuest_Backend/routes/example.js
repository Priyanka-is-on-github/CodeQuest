const express = require('express');
const Example = require('../models/example');

const router = express.Router()

router.post('/', async(req, res)=>{

    const {questionId} = req.query;
    
   const {example}= req.body;


    try {
        
        const response = await Example.create({
            questionId,
            example,
            
        })

        console.log('r=', response)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;