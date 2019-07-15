const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('./Client')

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'student',
    enum: ['admin', 'superadmin', 'student', 'manager']
  },
  clientID: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  active: {
    type: Boolean,
    default: true
  },
  programs: []
})

const User = mongoose.model('User', userSchema)

module.exports = User
