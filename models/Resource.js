const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./Program')

const resourceSchema = new Schema({
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

const validateResource = (resource) => {
  const schema = new Joi.object({
    name: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    type: Joi.string()
      .valid('pdf', 'doc/docx', 'image', 'url', 'video', 'text', 'powerpoint', 'embedded', 'other'),
    project: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    content: Joi.array().items(Joi.string(), Joi.object())
  })
  return Joi.validate(resource, schema)
}

module.exports = { 
  Resource,
  validateResource
}
