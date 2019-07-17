const { Client, validateClient } = require('../models/Client')
const { User } = require('../models/User')

const assignEmployeeToClient = (clientID, userID) => {
  Client.updateOne({ 
    _id: clientID 
  }, { $push: { employees: userID }
  }).exec((err) => {
    if (err) { console.log(err) }
    User.updateOne({
      _id: userID
    }, { $set: { clientID: clientID }
    }).exec((err) => {
      if (err) { console.log(err) }
      console.log(`updated user clientID`);
    })
  })
}

const assignProgramtoClient = (clientID, programID) => {
  Client.updateOne({
    _id: clientID
  }, { $push: { programs: programID }
}).exec((err) => {
  if (err) { console.log(err) }
})
}

const createClient = async (clientObject) => {
  const { error } = validateClient(clientObject)
  if (error) {
    console.log(error.message);
    return { error: {
      name: error.name,
      message: error.message,
      status: 400
    }}
  } else {
    try {
      await Client.create({
        companyName: clientObject.companyName,
      })
    } catch(err) {
      console.log(err.message);
    }
  }
}

module.exports = {
  assignEmployeeToClient,
  assignProgramtoClient,
  createClient
}