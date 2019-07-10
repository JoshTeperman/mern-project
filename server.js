const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 5000

// DEV DB on localhost -->
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('👺  Error connecting to MongoDB');
  } else {
    console.log('✅  Connected to MongoDB');
  }
})


app.use(require('./routes'))

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
