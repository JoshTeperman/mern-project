const { Client, validateClient } = require('../models/Client')

const assignEmployeeToClient = (clientID, userID) => {
  Client.updateOne({ 
    _id: clientID 
  }, { $push: { employees: userID }
  }).exec((err) => {
    if (err) { console.log(err) }
    console.log(`User: ${userID} has been added to Client: ${clientID} employees`);
  })
}

const assignProgramtoClient = (clientID, programID) => {
  Client.updateOne({
    _id: clientID
  }, { $push: { programs: programID }
}).exec((err) => {
  if (err) { console.log(err) }
  console.log(`Program: ${programID} has been added to Client: ${clientID} programs`)
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