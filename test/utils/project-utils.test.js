const { assert } = require('chai')
const mongoose = require('mongoose')
const { Resource } = require('../../models/Resource')
const { Project } = require('../../models/Project')
const { assignResourceToProject, createProject } = require('../../controllers/project-controller')

describe('Project', () => {
  before(async() => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    await mongoose.connect(mongoDB, { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }); 
    await Resource.deleteMany();
    await Project.deleteMany();
  })

  beforeEach(async () => {
    await Project.create({ 
      _id: new mongoose.Types.ObjectId().toString(),
      name: 'Test Project',
      description: 'Project Description',
      category: 'Project Category',
      startDate: new Date(),
      endDate: new Date()
    })
  })

  afterEach(async () => {
    await Project.deleteMany();
    await Resource.deleteMany();
  }); 

  after(async() => {
    await mongoose.connection.close()
  })

  describe('Project Model & Project Utility Methods', () => {
    describe('Project Model', () => {
      it('Project model exists', () => {
        assert.notEqual(Project, undefined, 'Project should not be undefined')
      })
    
      it('Valid Project initializes without error', async () => {
        testProject = await Project.findOne({ name: 'Test Project' })
        assert.notExists(testProject.error)
      })
    })

    describe('Project Utility Methods', () => {
      it('createProject method successfully creates a new Project', async () => {
        const projectObject = {
          _id: new mongoose.Types.ObjectId().toString(),
          name: 'New Project',
          description: 'New Project Description',
          category: 'New Project Category',
          startDate: new Date(),
          endDate: new Date()
        }
        await createProject(projectObject)
        const project = await Project.findOne({ name: 'New Project' })
        assert.exists(project)
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
