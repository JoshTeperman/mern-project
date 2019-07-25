const { assert } = require('chai')
const mongoose = require('mongoose')
const { Client } = require('../../models/Client')
const { User } = require('../../models/User')
const { Program } = require('../../models/Program')
const { createUser, assignProgramToUser, editUser } = require('../../controllers/user-controller')

describe('User', () => {
  before(async() => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    mongoose.connect(mongoDB, { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
     });
    await User.deleteMany();
    await Client.deleteMany();
    await Program.deleteMany();
  })

  beforeEach(async () => {
    await User.create({ 
      _id: new mongoose.Types.ObjectId().toString(),
      email: 'test@gmail.com',
      password: 'password',
      role: 'student'
    })
  })

  afterEach(async () => {
    await Client.deleteMany();
    await User.deleteMany();
    await Program.deleteMany();
  }); 

  after(async() => {
    await mongoose.connection.close()
  })

  describe('User Model & User Controller Methods', () => {
    describe('User Model', () => {
      it('User model exists', () => {
        assert.notEqual(User, undefined, 'User should not be undefined')
      })
    
      it('Valid User initializes without error', async () => {
        testUser = await User.findOne({ email: 'test@gmail.com' })
        assert.notExists(testUser.error)
      })

      it('User does not pass validation when email is invalid', async () => {
        const invalidUser = await createUser({ email: 'invalidemail', password: 'password' })
        assert.exists(invalidUser.error)
      })

      it('User does not pass validation when password is invalid, too short', async () => {
        const invalidUser = await createUser({ email: 'valid@email.com', password: 'abc' })
        assert.exists(invalidUser.error)
      })

      it('Duplicate User does not pass validation', async () => {
        const userObject = {
          _id: new mongoose.Types.ObjectId().toString(),
          email: 'test@gmail.com',
          password: 'password',
          role: 'student'
        }
        const duplicate = await createUser(userObject)
        assert.exists(duplicate.error)
        const duplicates = await User.find({ email: 'test@gmail.com' })
        assert.equal(duplicates.length, 1)
      })
    })

    describe('User Controller Methods', () => {
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

      it('editUser method successfully mutates an existing User', async () => {
        const user = await User.findOne({ email: 'test@gmail.com'})
        const update = { active: false }
        await editUser(user._id, update)
        const updatedUser = await User.findOne({ email: 'test@gmail.com' })
        assert.equal(updatedUser.active, false)
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


