const { Client, validateClient } = require('../models/Client')

const addEmployeeToClient = (clientID, userID) => {
  Client.updateOne({ 
    _id: clientID 
  }, { $push: { employees: userID }
  }).exec((err, client) => {
    if (err) { console.log(err) }
    console.log(`User: ${userID} has been added to the list of ${clientID} employees`);
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
  addEmployeeToClient,
  createClient
}