const mongoose = require('mongoose')
const app = require('./express')
const config = require('./config/config')
require('dotenv').config()

// DEV DB on localhost -->
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('👺  Error connecting to MongoDB');
  } else {
    console.log('✅  Connected to MongoDB');
  }
})

app.use(require('./routes'))

app.listen(config.PORT, () => console.log(`listening on PORT ${config.PORT}`))
