const { Client, validateClient } = require('../models/Client')

const addEmployee = (userID, clientID) => {
  Client.updateOne({ 
    _id: clientID 
  }, { $push: { employees: userID }
  }).exec((err, client) => {
    if (err) { console.log(err) }
    console.log(`${userID} has been added to the list of ${clientID} employees`);
  })
}

const createClient = async (clientObject) => {
  const { error } = validateClient(clientObject)
  if (error) {
    return { error: {
      name: error.name,
      message: error.message,
      status: 400
    }}
  }
  try {
    await Client.create({
      companyName: clientObject.companyName,
    })
  } catch(err) {
    console.log(err.message);
  }
}

module.exports = {
  addEmployee,
  createClient
}