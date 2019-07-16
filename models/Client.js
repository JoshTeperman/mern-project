const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./User')
require('./Program')

const clientSchema = new Schema({
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
      .regex(/[0-9a-zA-Z]/, "Company name is invalid")
      .required(),
    //author = Joi.objectID(),
    // Keep length minimum to reduce low value comments.
    text: Joi.string()
      .min(50)
      .required()
  });
  return Joi.validate(comment, schema);
};



module.exports = Client