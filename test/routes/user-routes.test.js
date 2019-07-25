const app = require("../../express");
const request = require("supertest");
const { assert } = require("chai")
const mongoose = require("mongoose");
const { generateToken } = require('../../utils/auth-utils')
const { createUser } = require('../../controllers/user-controller')
const { createProgram } = require('../../controllers/program-controller')

describe("User Routes", () => {
  it("has a module", () => {
    assert.ok(app)
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    await mongoose.connect(mongoDB, { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }); 
    await mongoose.connection.db.dropDatabase();
    server = app.listen(3001);
  });

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe('Routes', async () => {
    const testUser = await createUser({ 
      _id: new mongoose.Types.ObjectId().toString(), 
      email: 'test@gmail.com', 
      password: 'password', 
      role: 'student' 
    })
    const token = await generateToken(testUser.email)

    describe('GET: user/profile', () => {
      it('returns 200 status with the correct authorization', async () => {
        await request(server)
          .get('/user/profile')
          .set({ token })
          .expect(200)
      })
    })
  
    describe('GET: /user/stats', () => {
      it('returns 200 status with the correct authorization', async () => {
        await request(server)
          .get('/user/stats')
          .set({ token })
          .expect(200)
      })
    })
  })
})