const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('👺 Error connecting to MongoDB');
  }
  console.log('✅ Connected to MongoDB');
})

app.use(require('./routes'))

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
