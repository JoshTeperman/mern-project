const app = require("../../express");
const request = require("supertest");
const { assert } = require("chai")
const mongoose = require("mongoose");

describe.skip("User Routes", () => {
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

  describe('GET: user/profile', () => {
    it('returns 200 status with the correct authorization', async () => {
      await request(server)
        .get('/user/profile')
        .expect(200)
    })
  })

  describe('GET: user/user-stats', () => {
    it('returns 200 status with the correct authorization', async () => {
      await request(server)
        .get('/user/user-stats')
        .expect(200)
    })
  })

  describe('GET: user/program/:id', () => {
    it('returns 200 status with the correct authorization', async () => {
      await request(server)
        .get('/user/program/:id')
        .expect(200)
    })
  })

  describe('GET: user/project/:id', () => {
    it('returns 200 status with the correct authorization', async () => {
      await request(server)
        .get('/user/project/:id')
        .expect(200)
    })
  })


})


// router.get('/profile', profile)
// router.get('/user-stats', userStats)

// router.get('/program/:id', fetchProgram)
// router.get('/program/:id/projects', fetchProjects)
// router.get('/project/:id', fetchProject)
// router.get('/project/:id/resources', fetchResources)
// router.get('/project/:id/resources/:resourceId', fetchResource)