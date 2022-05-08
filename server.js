//import express
const express = require ('express')

//instance of all express methods
const app = express()

//---global middleware to parse data to json type
app.use(express.json())
app.use('/api/user',require('./routes/userRoute'))

//import mongoose
const mongoose = require ('mongoose')

// ---our env variables
require('dotenv').config()

//connect with database
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>err?console.log(err):console.log(`The database is connected...`))

// Port
const Port=process.env.PORT;

//Initiate the server
app.listen(Port, (err)=>err?console.log(err):console.log(`server is running on port ${Port}`))