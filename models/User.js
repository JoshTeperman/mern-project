const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./Client')

const userSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
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
  programs: [{
    type: Schema.Types.ObjectId,
    ref: 'Program'
  }]
})

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
  const schema = Joi.object().keys({
    _id: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
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
