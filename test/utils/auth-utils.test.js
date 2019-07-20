const mongoose = require('mongoose')
const { assert } = require('chai')
const { User } = require('../../models/User')
const { generateHashedPassword, generateToken, checkPassword } = require('../../utils/auth-utils')
const { createUser } = require('../../utils/User-utils')
const path = require('path');
const dotEnvPath = path.resolve('./.env')
require('dotenv').config({ path: dotEnvPath});


describe('Auth Utils Methods', () => {
  before(async() => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await User.deleteMany();
  })

  after(async() => {
    await mongoose.connection.close()
  })

  it('generateHashedPassword generates a hashed password', () => {
    const hash = generateHashedPassword('password')
    assert.ok(hash)
  })

  it('generateToken returns a token', () => {
    const token = generateToken('email@email.com')
    assert.ok(token)
  })

  describe('Check Password method', async () => {
    // User with original password: 'password' mutated with generateHashedPassword function:
    const user = {
      role: 'student',
      active: true,
      programs: [],
      _id: '5d3398fc74afd4d814e13899',
      email: 'test@test.com',
      password: '$2b$10$dw0t6wySyXbF.bNJrBJLqOl4MwBrOh9SsegMLwRVQtiOHZ/IAX5zO',
      __v: 0
    }

    it('checkPassword returns true for a valid password', async () => {
      const check = await checkPassword('password', user.password)
      assert.ok(check)
    })
  
    it('checkPassword returns false for an invalid password', async () => {
      const check = await checkPassword('wrongpassword', user.password)
      assert.isNotOk(check)
    })
  })
})