const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./User')
require('./Client')
require('./Project')

const programSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  clientID: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
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
    default: false
  }
})

const Program = mongoose.model('Program', programSchema)

const validateProgram = async (program) => {
  const schema = new Joi.object({
    _id: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
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

  try {
    return result = await Joi.validate(program, schema);
  } catch(err) {
    return { error: err }
  }}

module.exports = {
  Program,
  validateProgram
}
