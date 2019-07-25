const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./Program')

const resourceSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    default: 'url',
    enum: ['pdf', 'doc/docx', 'image', 'url', 'video', 'text', 'powerpoint', 'embedded', 'other']
  },
  projectID: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  content: [],
  completed: {
    type: Boolean,
    default: false
  }
}) 

const Resource = mongoose.model('Resource', resourceSchema)

const validateResource = async (resource) => {
  const schema = new Joi.object({
    _id: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    name: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    type: Joi.string()
      .valid('pdf', 'doc/docx', 'image', 'url', 'video', 'text', 'powerpoint', 'embedded', 'other')
      .required(),
    projectID: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    content: Joi.array().items(Joi.string(), Joi.object())
  })
  try {
    return result = await Joi.validate(resource, schema);
  } catch(err) {
    return { error: err }
  }
}

module.exports = { 
  Resource,
  validateResource
}
