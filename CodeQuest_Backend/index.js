const express = require('express')
const app = express();
const connectToMongoDB = require('./connection')
const AuthRouter = require('./routes/AuthRouter')
const questionRouter = require('./routes/questionRouter')

const exampleRouter = require('./routes/example')
const testcaseRouter = require('./routes/testcaseRouter')
const IntershipsRouter = require('./routes/IntershipsRouter')
const developersRouter = require('./routes/developersRouter')
const notificationRouter = require('./routes/notificationRouter')
const cors = require('cors')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
require('dotenv').config(); 


const PORT = process.env.PORT || 3001;

//connection

connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas is connected'))
  .catch((err) => console.log('Mongo Error', err));


//middleware

app.use(cors());

app.use(express.json());



app.use('/api/v1/auth', AuthRouter )
app.use('/api/v1/auth/recruiter', AuthRouter )
app.use('/api/v1/auth/companies', AuthRouter )


app.use('/api/v1/internships', IntershipsRouter )
app.use('/api/v1/developers', developersRouter )

// app.use('/api/v1/createtest', createtestRouter)
app.use('/api/v1/question', questionRouter)
app.use('/api/v1/examples', exampleRouter)
app.use('/api/v1/testcases', testcaseRouter)
app.use('/api/v1/notifications', notificationRouter)



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, ()=>{
    console.log('Server is running at port number', PORT)
})