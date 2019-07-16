const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./Client')

const userSchema = new Schema({
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

const validateUser = (user) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(4)
      .required(),
    role: Joi.string()
    .valid('admin', 'superadmin', 'student', 'manager')
    .required(),
    clientID: Joi.string()
    .regex(/[0-9a-fA-F]{24}/),
    programs: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/))
  });
  return Joi.validate(user, schema);
};


module.exports = { 
  User,
  validateUser
}
