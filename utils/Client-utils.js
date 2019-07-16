const Client = require('../models/Client')

const addEmployee = (userID, clientID) => {
  Client.updateOne({ 
    _id: clientID 
  }, { $push: { employees: userID }
  }).exec((err, client) => {
    if (err) { console.log(err) }
    console.log(`${userID} has been added to the list of ${clientID} employees`);
  })
}

module.exports = {
  addEmployee
}