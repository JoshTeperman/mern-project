const { assert, expect } = require('chai')
const mongoose = require('mongoose')
const { Client } = require('../../models/Client')
const { User } = require('../../models/User')
const { createClient, assignEmployeeToClient, assignProgramToClient } = require('../../utils/Client-utils')

describe('Client', () => {
  before(async() => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Client.deleteMany();
  })

  beforeEach(async () => {
    await Client.create({ companyName: 'Test Client', _id: new mongoose.Types.ObjectId() })
  })

  afterEach(async () => {
    await Client.deleteMany();
    await User.deleteMany();
  }); 

  after(async() => {
    await mongoose.connection.close()
  })

  describe('Client Model & Client Utility Methods', () => {
    describe('Client Model', () => {
      it('Client model exists', () => {
        assert.notEqual(Client, undefined, 'Client should not be undefined')
      })
    
      it('Valid Client initializes as expected', async () => {
        testClient = await Client.findOne({ companyName: 'Test Client' })
        assert.ok(testClient)
      })

      it('Client with invalid companyName does not pass validation', async () => {
        await createClient({ companyName: '41/#', _id: new mongoose.Types.ObjectId().toString()})
        await createClient({ companyName: '', _id: new mongoose.Types.ObjectId().toString()})
        testClient1 = await Client.findOne({companyName: '41/#'})
        testClient2 = await Client.findOne({companyName: ''})
        assert.notExists(testClient1)
        assert.notExists(testClient2)
      })
    })

    describe('Client Utility Methods', () => {
      it('createClient method successfully creates a new Client', async () => {
        const testClient = await createClient({ companyName: 'Test Client', _id: new mongoose.Types.ObjectId().toString() })
        assert.equal(testClient.companyName, 'Test Client')
      })

      it('assignEmployeeToClient method successfully adds an ObjectID to Client', async () => {
        const newUser = await User.create({ 
          _id: new mongoose.Types.ObjectId().toString(),
          email: 'test@test.com', 
          password: 'password', 
          role: 'student'
        })
        let client = await Client.findOne({companyName: 'Test Client'})
        await assignEmployeeToClient(client._id, newUser._id)
        client = await Client.findOne({companyName: 'Test Client'})
        assert.include(client.employees, newUser._id )
      })
      
      it('assignProgramToClient method successfully adds an ObjectID to Client', async () => {
        // let client = await Client.findOne({ companyName: 'Test Client' })
        const programID = await new mongoose.Types.ObjectId().toString()
        await Client.findOne({ companyName: 'Test Client' }, async (err, client) => {
          await assignProgramToClient(client._id, programID);
        })
        const query = await Client.findOne({ companyName: 'Test Client' })
        assert.include(query.programs, programID, 'should be the same ObjectId')
      })
    })
  })
})


