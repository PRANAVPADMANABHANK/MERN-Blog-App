const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()

//connect db && //connect server
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB has been started successfully')
    // Start the server after successful database connection
    app.listen(process.env.PORT, () => {
      console.log('Server has been started successfully')
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })