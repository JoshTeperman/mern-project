const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./User')
require('./Client')
require('./Project')

const programSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  clientID: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    require: true
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: String,
  },
  accountManager: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  completed: {
    type: Boolean,
    default: true
  }
})

const Program = mongoose.model('Program', programSchema)

module.exports = Program
