const app = require("../../express");
const request = require("supertest");
const { assert } = require("chai")
const mongoose = require("mongoose");

describe("Admin Routes", () => {
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

  after(async () => {
    await mongoose.connection.close();
    await server.close();
  });

//   router.get('/users', getUsers)
// router.get('/clients', getClients)
// router.get('/programs', getPrograms)
// router.get('/projects', getProjects)
// router.get('/resources', getResources)

  describe('POST: admin/users', () => {

    it('returns 200 status with the correct authorization', async () => {
      await request(server)
        .post('/admin/users')
        .send({
          
        })
        .expect(200)
    })

  })
})