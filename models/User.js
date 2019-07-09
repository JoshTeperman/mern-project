const mongoose = require('mongoose')
const Schema = mongoose.Schema;)


const lessonSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  status: 'incomplete'
})

const courseSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  category: String,
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  status: 'incomplete'
})

const userSchema = new Schema({
  email: String,
  password: String,
  role: String,
  company: String,
  status: String, // active, inactive
  assignedCourses: {
    Courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    Completed: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
  },
  history: {
    Courses: []
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

// TODO: How to store course / lesson progress -> should we make a copy of every assigned course and keep a progress value for each? Should we only keep a list of IDs and store {ID: progress}