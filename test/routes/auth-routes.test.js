const app = require("../../express");
const request = require("supertest");
const { assert } = require("chai")
const mongoose = require("mongoose");
const { User } = require('../../models/User')
const { createUser } = require('../../utils/User-utils')

describe("Auth Routes", () => {
  it("has a module", () => {
    assert.ok(app)
  });

  let server;

  before(async () => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    await mongoose.connect(mongoDB, { useNewUrlParser: true });
    await mongoose.connection.db.dropDatabase();
    server = app.listen(3001);
  });

  beforeEach(async () => {
    await createUser({ 
      _id: new mongoose.Types.ObjectId().toString(),
      email: 'test@gmail.com', 
      password: 'password',
      role: 'student'
    })
  })

  afterEach(async () => {
    await User.deleteMany()
  })
  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe('POST /auth/login', () => {
    it('can login with valid credentials', async () => {
      await request(server)
        .post('/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'password'
        })
        .expect(200)
    })

    it('invalid password returns a 403 status with correct error message', async () => {
      await request(server)
        .post('/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'invalidpassword'
        })
        .expect(403)
        .expect((res) => {
          const response = JSON.parse(res.text)
          assert.equal(response.error.message, 'Could not authenticate user')
        })
    })

    it('login request missing email returns a 403 status with correct error message', async () => {
      await request(server)
        .post('/auth/login')
        .send({
          password: 'password'
        })
        .expect(403)
        .expect((res) => {
          const response = JSON.parse(res.text)
          assert.equal(response.error.message, 'Could not authenticate user')
        })
    })

    it('login request missing password returns a 403 status with correct error message', async () => {
      await request(server)
        .post('/auth/login')
        .send({
          email: 'test@gmail.com'
        })
        .expect(403)
        .expect((res) => {
          const response = JSON.parse(res.text)
          assert.equal(response.error.message, 'Could not authenticate user')
        })
    })

    it('unknown email returns a 403 status with correct error message', async () => {
      await request(server)
        .post('/auth/login')
        .send({
          email: 'unknown@email.com',
          password: 'password'
        })
        .expect(403)
        .expect((res) => {
          const response =  JSON.parse(res.text);
          assert.equal(response.error.message, `User doesn't exist`);
        })
    })
  })
}