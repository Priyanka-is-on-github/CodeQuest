const express = require('express')
const app = express();
const connectToMongoDB = require('./connection')
const AuthRouter = require('./routes/AuthRouter')
const questionRouter = require('./routes/questionRouter')
const createtestRouter = require('./routes/createtest')
const exampleRouter = require('./routes/example')
const cors = require('cors')


const PORT = 3001;

//connection
connectToMongoDB('mongodb://127.0.0.1:27017/Test_Management_System').then(()=>{
    console.log('Mongo db is connected')
}).catch((err)=>console.log('"Mongo Error',err))

//middleware

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

app.use(express.json());



app.use('/api/v1/auth', AuthRouter )
app.use('/api/v1/createtest', createtestRouter)
app.use('/api/v1/question', questionRouter)
app.use('/api/v1/example', exampleRouter)


app.listen(PORT, ()=>{
    console.log('Server is running at port number', PORT)
})