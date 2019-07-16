const assert = require('assert')
const { createClient, addEmployee } = require('../../utils/Client-utils')

// assert that addEmployee Model.updateOne() returns nmodified: 1

describe('createClient function', () => {
  it.skip('should create a new client without error', async (done) => {
    try { 
    const newClient = await createClient({ companyName: 'Test Client' })
  } catch(err) {
    console.log(err);
  }
  await done()  
    // assert.equal(newClient.companyName, 'Test Clients')
  })
})

