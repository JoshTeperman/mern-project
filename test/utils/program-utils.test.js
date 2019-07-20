const { assert, expect } = require('chai')
const mongoose = require('mongoose')
const { Client } = require('../../models/Client')
const { User } = require('../../models/User')
const { Program } = require('../../models/Program')
const { createProgram } = require('../../utils/Program-utils')

describe('User', () => {
  before(async() => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await User.deleteMany();
  })

  beforeEach(async () => {
    await User.create({ 
      _id: new mongoose.Types.ObjectId(),
      email: 'test@gmail.com',
      password: 'password',
      role: 'student'
    })
  })

  afterEach(async () => {
    await Client.deleteMany();
    await User.deleteMany();
  }); 

  after(async() => {
    await mongoose.connection.close()
  })

  describe.skip('User Model & User Utility Methods', () => {
    describe('User Model', () => {
      it('User model exists', () => {
        assert.notEqual(User, undefined, 'User should not be undefined')
      })
    
      it('Valid User initializes as expected', async () => {
        testUser = await User.findOne({ email: 'test@gmail.com' })
        assert.ok(testUser)
      })

      it.skip('Duplicate Program does not pass validation', async () => {
        const userObject = {
          _id: mongoose.Types.ObjectId().toString(),
          email: 'test@gmail.com',
          password: 'password',
          role: 'student'
        }
        const duplicate = await createUser(userObject)
        const result = await User.find()
        assert.exists(duplicate.error)
      })
    })

    describe('User Utility Methods', () => {
      it('createUser method successfully creates a new User', async () => {
        const userObject = {
          _id: mongoose.Types.ObjectId().toString(),
          email: 'newuser@gmail.com',
          password: 'password',
          role: 'student'
        }
        await createUser(userObject)
        const user = await User.findOne({ email: 'newuser@gmail.com' })
        assert.exists(user)
      })

      it('assignProgramToUser method successfully adds an programID to User', async () => {
        let program = await Program.create({ 
          _id: await new mongoose.Types.ObjectId().toString(),
          name: 'Test Program',
          description: 'Test Description',
          category: 'Test Category',
          startDate: new Date(),
          endDate: new Date()
        })

        const user = await User.findOne({ email: 'test@gmail.com' })
        await assignProgramToUser(user._id, program._id)

        const updatedUser = await User.findOne({ email: 'test@gmail.com' })
        assert.include(updatedUser.programs, program._id )
      })
    })
  })
})


