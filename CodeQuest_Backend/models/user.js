const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        //unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin", "user"],
        default:"user",
        required:true
    }
},
{timestamps:true}

)

// hash password midleware
userSchema.pre('save', async function(next){
    //console.log('pre method', this)

    const user = this
    if(!user.isModified('password')){
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound)
        user.password = hash_password;
    } catch (error) {
        next(error)
    }
})
const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel;