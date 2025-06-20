const jwt = require('jsonwebtoken')
require('dotenv').config();

const secret = process.env.SECRET_KEY


function setUser({ email,password}){

   

    const payload = {
      
       email,
       password,
    }

    const token = jwt.sign(payload, secret,{ expiresIn: '1y' })
    return token;
}

module.exports = {setUser};