const mongoose = require('mongoose')

const testcasesSchema = new mongoose({

    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    
})