const { Client, validateClient } = require('../models/Client')
const { User } = require('../models/User')

const assignEmployeeToClient = (clientID, userID) => {  
  console.log(typeof userID);
  Client.updateOne({ 
    _id: clientID 
  }, { $push: { employees: userID }
  }).exec((err, result) => {
    if (err) { console.log(err) }
    User.updateOne({
      _id: userID
    }, { $set: { clientID: clientID }
    }).exec((err, result) => {
      if (err) { console.log(err) }
    })
  })
}

const assignProgramToClient = (clientID, programID) => {
  Client.updateOne({
    _id: clientID
  }, { $push: { programs: programID }
}).exec((err, result) => {
  if (err) { console.log(err) }
})
}

const createClient = async (clientObject) => {
  const { error } = await validateClient(clientObject)
  if (error) {
    return { error }
  }
  try {
    return await Client.create({
      _id: clientObject._id,
      companyName: clientObject.companyName,
    })
  } catch(err) {
    console.log(err.message);
  }
}

module.exports = {
  assignEmployeeToClient,
  assignProgramToClient,
  createClient
}