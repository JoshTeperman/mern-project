const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./Program')

const resourceSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'url',
    enum: ['pdf', 'doc/docx', 'image', 'url', 'video', 'text', 'powerpoint', 'embedded', 'other']
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  content: [],
  completed: {
    type: Boolean,
    default: true
  }
})

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource
