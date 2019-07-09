const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 5000

// DEV DB on localhost -->
// mongoose.connect(process.env.MONGO_PROD_URI, { useNewUrlParser: true }, err => {
//   if (err) {
//     console.log('👺  Error connecting to MongoDB');
//   } else {
//     console.log('✅  Connected to MongoDB');
//   }
// })

// PROD DB on Atlas -->
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGO_PROD_URI, { useNewUrlParser: true });
client.connect(err => {
  if (err) {
    console.log('👺  Error connecting to mongoDB');
  } else {
    console.log('✅  Connected to mongoDB');
  }
  const collection = client.db("CA-MERN").collection("users");
  // collection.insertOne({ email: 'josh@josh.com', password: 'password'})
  client.close();
});

app.use(require('./routes'))

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
