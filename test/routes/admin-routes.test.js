const app = require("../../express");
const request = require("supertest");
const { assert } = require("chai")
const sinon = require('sinon')
const mongoose = require("mongoose");
const { createUser } = require('../../controllers/user-controller')
const { generateToken } = require('../../utils/auth-utils')
const { User } = require('../../models/User')

const userObject = {

};

describe("Admin Routes", async () => {
  let server;
  
  it("has a module", () => {
    assert.ok(app)
  });
  
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
    await User.deleteMany();
    await mongoose.connection.close();
    await server.close();
  });
  
  describe('GET: admin/users', async () => {
    it('returns 200 status with the correct authorization', async () => {
      const testUser = await createUser({ 
        _id: new mongoose.Types.ObjectId().toString(), 
        email: 'test@gmail.com', 
        password: 'password', 
        role: 'student' 
      })

      const token = await generateToken(testUser.email)
        await request(server)
        .get('/admin/users')
        .set({ token })
        .expect(200)
        .expect((res) => {
          const result = JSON.parse(res.text)
          assert.notExists(result.error)
          assert.exists(result.users)
        })
        .catch(err => {
          console.log(err);
        })
    })
  })

  describe.skip('GET: admin/clients', () => {
    it('returns 200 status with the correct authorization', async () => {
      await request(server)
        .get('/admin/clients')
        .expect(200)
    })
  })

  describe.skip('GET: admin/programs', () => {
    it('returns 200 status with the correct authorization', async () => {
      await request(server)
        .get('/admin/programs')
        .expect(200)
    })
  })

  describe.skip('GET: admin/projects', () => {
    it('returns 200 status with the correct authorization', async () => {
      await request(server)
        .get('/admin/projects')
        .expect(200)
    })
  })

  describe.skip('GET: admin/resources', () => {
    it('returns 200 status with the correct authorization', async () => {
      await request(server)
        .get('/admin/resources')
        .expect(200)
    })
  })
})