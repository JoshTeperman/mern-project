const mongoose = require('mongoose')
const Schema = mongoose.Schema;


// const lessonSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   name: String,
//   description: String,
//   status: 'incomplete'
// })

// const courseSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   name: String,
//   description: String,
//   category: String,
//   lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
//   status: 'incomplete'
// })

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  status: {
    // active, inactive
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

// TODO: How to store course / lesson progress -> should we make a copy of every assigned course and keep a progress value for each? Should we only keep a list of IDs and store {ID: progress}