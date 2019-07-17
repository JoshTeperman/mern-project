const { assert, expect } = require('chai')
const mongoose = require('mongoose')
const { Client } = require('../../models/Client')
const { createClient, assignEmployeeToClient, assignProgramToClient } = require('../../utils/Client-utils')

describe('Client Model & Client Utility Methods', () => {
  before(async() => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Client.deleteMany();
  })

  afterEach(async () => {
    await Client.deleteMany();
  }); 

  after(async() => {
    await mongoose.connection.close()
  })

  describe('Client Model', () => {
    it('Client model exists', () => {
      assert.notEqual(Client, undefined, 'Client should not be undefined')
    })
  
    it('Valid Client initializes as expected', async () => {
      const newClient = await Client.create({ companyName: 'Test Client' })
      assert.equal(newClient.companyName, 'Test Client', 'name should be Test Client')
    })
  })

  describe('Client Utility Methods', () => {
    it('createClient method successfully creates a new Client', async () => {
      const newClient = await createClient({ companyName: 'Test Client' })
      assert.equal(newClient.companyName, 'Test Client')
    })

    it('assignEmployeeToClient method successfully adds an objectID to Client', async () => {
      const newClient = await createClient({ companyName: 'Test Client' })
      const userID = await mongoose.Types.ObjectId()
      console.log(newClient);
      console.log(userID);
      assignEmployeeToClient(newClient._id, userID)

      assert.include(newClient.employees, userID, 'should be the same ObjectId')
    })
  })
})


