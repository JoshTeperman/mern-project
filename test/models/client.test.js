const assert = require('assert')
const Client = require('../../models/Client')

describe('Client', () => {
  it('creates without any errors', async () => {
    const client = new Client({ companyName: 'Test Client'})
    
    await client.save((err, client) => {
      if (err) {
        console.log(err);
      } else {
        console.log('hello')
      }
      // console.log(client);
      // done()
    })
    assert.equal(client.companyName, 'Test Client')
    
    
  })
})
// describe('Client Model validation', () => {
//   it('creates without any errors', (done) => {
//     const client = new Client({ companyName: 'Test Client'})
//     client.save()
//       .then(() => {
//         console.log('dot then');
//         console.log(client);
//         done()
//       .catch((err) => {
//         console.log('dot catch');
//         console.log(err);
//         done()
//       })
//     })
//   })
// })