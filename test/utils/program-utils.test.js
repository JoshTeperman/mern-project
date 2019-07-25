const { assert } = require('chai')
const mongoose = require('mongoose')
const { Program } = require('../../models/Program')
const { Project } = require('../../models/Project')
const { assignProjectToProgram, createProgram } = require('../../controllers/program-controller')

describe('Program', () => {
  before(async() => {
    const mongoDB = "mongodb://127.0.0.1/mi-academy_testdb";
    await mongoose.connect(mongoDB, { 
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }); 
    await Program.deleteMany();
    await Project.deleteMany();
  })

  beforeEach(async () => {
    await Program.create({ 
      _id: new mongoose.Types.ObjectId().toString(),
      name: 'Test Program',
      description: 'Program Description',
      category: 'Program Category',
      startDate: new Date(),
      endDate: new Date()
    })
  })

  afterEach(async () => {
    await Program.deleteMany();
    await Project.deleteMany();
  }); 

  after(async() => {
    await mongoose.connection.close()
  })

  describe('Program Model & Program Utility Methods', () => {
    describe('Program Model', () => {
      it('Program model exists', () => {
        assert.notEqual(Program, undefined, 'Program should not be undefined')
      })
    
      it('Valid Program initializes without error', async () => {
        testProgram = await Program.findOne({ name: 'Test Program' })
        assert.notExists(testProgram.error)
      })
    })

    describe('Program Utility Methods', () => {
      it('createProgram method successfully creates a new Program', async () => {
        const programObject = {
          _id: new mongoose.Types.ObjectId().toString(),
          name: 'New Program',
          description: 'New Program Description',
          category: 'New Program Category',
          startDate: new Date(),
          endDate: new Date()
        }
        await createProgram(programObject)
        const program = await Program.findOne({ name: 'New Program' })
        assert.exists(program)
      })

      it('assignProjectToProgram method successfully adds a projectID to Program', async () => {
        let project = await Project.create({ 
          _id: await new mongoose.Types.ObjectId().toString(),
          name: 'New Project',
          description: 'New Project Description',
          category: 'New Project Category',
          startDate: new Date(),
          endDate: new Date()
        })

        const program = await Program.findOne({ name: 'Test Program' })
        await assignProjectToProgram(program._id, project._id)

        const updatedProgram = await Program.findOne({ name: 'Test Program' })
        assert.include(updatedProgram.projects, project._id)
      })
    })
  })
})
