const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./User')
require('./Program')

const clientSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  companyName: {
    type: String,
  },
  clientRepresentative: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  programs: [{
    type: Schema.Types.ObjectId,
    ref: 'Program'
  }]
})

const Client = mongoose.model('Client', clientSchema)

const validateClient = async (client) => {
  const existingClient = await Client.findOne({ companyName: client.companyName })
  if (existingClient) {
    return { error: {
      name: 'Validation Error',
      message: 'User with that email already exists',
      status: 400
    }}
  }

  const schema = Joi.object().keys({
    _id: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    companyName: Joi.string()
      .regex(/[^\w\d\s]/, { invert: true })
      .min(3)
      .required(),
    clientRepresentative: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    employees: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/)),
    programs: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/))
  });
  try {
    return result = await Joi.validate(client, schema);
  } catch(err) {
    return { error: err }
  }
};

module.exports = {
  Client,
  validateClient
}