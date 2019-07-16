const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./Program')
require('./Resource')

const projectSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
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
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program'
    ,
    required: true
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  completed: {
    type: Boolean,
    default: true
  }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
