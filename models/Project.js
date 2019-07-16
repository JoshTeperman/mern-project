const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./Program')
require('./Resource')

const projectSchema = new Schema({
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
    ref: 'Program',
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

const validateProject = (project) => {
  const schema = new Joi.object({
    name: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    category: Joi.string()
      .required(),
    startDate: Joi.date()
      .required(),
    endDate: Joi.date()
      .required(),
    program: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    resources: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/)),
  })
  return Joi.validate(project, schema)
}

module.exports = {
  Project,
  validateProject
}
