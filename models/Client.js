const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./User')
require('./Program')

const clientSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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

const validateClient = (client) => {
  const schema = Joi.object().keys({
    companyName: Joi.string()
      .regex(/[0-9a-zA-Z]/)
      .required(),
    clientRepresentative: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    employees: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/)),
    programs: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/))
  });
  return Joi.validate(client, schema);
};



module.exports = {
  Client,
  validateClient
}