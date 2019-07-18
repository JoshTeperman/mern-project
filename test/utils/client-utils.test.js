const { assert, expect } = require('chai')
const mongoose = require('mongoose')
const { Client } = require('../../models/Client')
const { User } = require('../../models/User')
const { createClient, assignEmployeeToClient, assignProgramToClient } = require('../../utils/Client-utils')

describe('Client Model & Client Utility Methods', () => {
  before(async() => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Client.deleteMany();
  })

  afterEach(async () => {
    await Client.deleteMany();
    await User.deleteMany();
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

    it('assignEmployeeToClient method successfully adds an ObjectID to Client', async () => {
      const newClient = await Client.create({ companyName: 'Test Client' })
      const newUser = await User.create({ email: 'test@test.com', password: 'password', role: 'student' })

      await assignEmployeeToClient(newClient._id, newUser._id.toString())
      // assert.ok(newClient)
      // assert.include([newUser._id, 'abc'], 'abc')
      const result = await User.find({email: 'test@test.com'})
      console.log(result);
      expect(result).to.be.an('array').that.includes(newUser)
      // assert result.

    //   it('should complete this test', async () => {
    //     await Promise.resolve();
    //     assert.ok(true);
    // });
    
      // assert.include(newClient.employees, newUser._id, 'should include the same ObjectId')
    })
    
    it.skip('assignProgramToClient method successfully adds an ObjectID to Client', (done) => {
      const newClient = createClient({ companyName: 'Test Client' })
      const userID = mongoose.Types.ObjectId()

      assignEmployeeToClient(newClient._id, userID.toString())
        .then((result) => {
          assert.ok(result)
          done()
        })


      // assert.include(newClient.employees, userID, 'should be the same ObjectId')
    })
  })
})


