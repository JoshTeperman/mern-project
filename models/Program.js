const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
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

const validateProgram = (program) => {
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
    accountManager: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    projects: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/)),
  })

  return Joi.validate(program, schema)
}

module.exports = {
  Program,
  validateProgram
}
