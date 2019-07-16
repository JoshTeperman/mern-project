const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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

module.exports = Client