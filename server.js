const mongoose = require('mongoose')
const app = require('./express')
const { config, seedSuperAdmin } = require('./config/config')

require('dotenv').config()

// DEV DB on localhost -->
mongoose.connect(process.env.DB_URL, { 
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
}, err => {
  if (err) {
    console.log('👺  Error connecting to MongoDB');
  } else {
    console.log('✅  Connected to MongoDB');
    // seedSuperAdmin()
  }
})


app.use(require('./routes'))

app.listen(config.PORT, () => console.log(`listening on PORT ${config.PORT}`))
