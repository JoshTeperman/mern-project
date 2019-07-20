const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./Program')
require('./Resource')

const projectSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
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
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
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

const validateProject = async (project) => {
  const schema = new Joi.object({
    _id: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    name: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    category: Joi.string()
      .required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    program: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    resources: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/)),
  })

  try {
    return result = await Joi.validate(project, schema);
  } catch(err) {
    return { error: err }    
  }
}


module.exports = {
  Project,
  validateProject
}
