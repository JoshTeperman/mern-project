const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./Client')

const userSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
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

const validateUser = async (user) => {
  const existingUser = await User.findOne({ email: user.email })
  if (existingUser) {
    return { error: {
      name: 'ValidationError',
      message: 'User with that email already exists',
      status: 403
    }}
  }
  const schema = Joi.object().keys({
    _id: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(4).error(new Error('Password must be longer than 4 characters'))
      .required(),
    role: Joi.string()
      .valid('admin', 'superadmin', 'student', 'manager')
      .required(),
    clientID: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    programs: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/))
  });
  try {
    return result = await Joi.validate(user, schema);
  } catch(err) {
      return { error: err }
  }
};


module.exports = { 
  User,
  validateUser
}
