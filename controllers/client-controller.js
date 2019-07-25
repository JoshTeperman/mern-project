const { Client, validateClient } = require('../models/Client')
const { User } = require('../models/User')

const assignEmployeeToClient = (clientID, userID) => {  
  console.log(typeof userID);
  try {
    Client.updateOne({ 
      _id: clientID 
    }, { $push: { employees: userID }
    }).exec((error, result) => {
      if (error) { 
        console.log(error) 
        return { error }
      }
      User.updateOne({
        _id: userID
      }, { $set: { clientID: clientID }
      }).exec((error, result) => {
        if (error) { 
          console.log(error) 
          return { error }
        }
      })
    })
  } catch(error) {
    console.log(error.message);
    return { error }
  }
}

const assignProgramToClient = (clientID, programID) => {
  Client.updateOne({
    _id: clientID
  }, { $push: { programs: programID }
}).exec((error, result) => {
  if (error) { 
    console.log(error.message) 
    return { error }
  }
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
  } catch(error) {
    console.log(error.message);
    return { error }
  }
}

module.exports = {
  assignEmployeeToClient,
  assignProgramToClient,
  createClient
}