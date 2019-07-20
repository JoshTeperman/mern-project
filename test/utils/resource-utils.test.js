const { assert } = require('chai')
const mongoose = require('mongoose')
const { Resource } = require('../../models/Resource')
const { createResource } = require('../../utils/Resource-utils')

describe('Resource', () => {
  before(async() => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    await Resource.deleteMany();
  })

  beforeEach(async () => {
    await Resource.create({ 
      _id: new mongoose.Types.ObjectId().toString(),
      name: 'Test Resource',
      description: 'Resource Description',
      type: 'text'
    })
  })

  afterEach(async () => {
    await Resource.deleteMany();
  }); 

  after(async() => {
    await mongoose.connection.close()
  })

  describe('Resource Model & Resource Utility Methods', () => {
    describe('Resource Model', () => {
      it('Resource model exists', () => {
        assert.notEqual(Resource, undefined, 'Resource should not be undefined')
      })
    
      it('Valid Resource initializes without error', async () => {
        testResource = await Resource.findOne({ name: 'Test Resource' })
        assert.notExists(testResource.error)
      })
    })

    describe('Resource Utility Methods', () => {
      it('createResource method successfully creates a new Resource', async () => {
        const resourceObject = {
          _id: new mongoose.Types.ObjectId().toString(),
          name: 'New Resource',
          description: 'New Resource Description',
          type: 'text'
        }
        await createResource(resourceObject)
        const resource = await Resource.findOne({ name: 'New Resource' })
        assert.exists(resource)
      })

      it('assignResourceToProject method successfully adds a resourceId to Project', async () => {
        let resource = await Resource.create({ 
          _id: await new mongoose.Types.ObjectId().toString(),
          name: 'New Resource',
          description: 'New Resource Description',
          category: 'New Resource Category',
          startDate: new Date(),
          endDate: new Date()
        })

        const project = await Project.findOne({ name: 'Test Project' })
        await assignResourceToProject(project._id, resource._id)

        const updatedProject = await Project.findOne({ name: 'Test Project' })
        assert.include(updatedProject.resources, resource._id)
      })
    })
  })
})
