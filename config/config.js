const mongoose = require('mongoose')
const { User } = require('../models/User')
const { createUser } = require('../controllers/user-controller')

const config = {
  PORT: process.env.PORT || 5000,
}

// const seedSuperAdmin = async () => {
//   const superAdmin = await User.findOne({ role: 'superadmin' })
//   if (!superAdmin) {
//     console.log('seeding super admin');
//     const userObject = {
//       _id: new mongoose.Types.ObjectId().toString(),
//       email: 'superadmin@admin.com',
//       password: 'password',
//       role: 'superadmin',
//     }
//     try {
//       const newSuperAdmin = await createUser(userObject)
//       console.log(`created Super Admin User: ${newSuperAdmin}`);
//     } catch(err) {
//       console.log(err.message);
//     }
//   } else {
//     console.log(`superAdmin already exists: ${superAdmin}`);
//   }
// }

module.exports = { 
  config, 
  // seedSuperAdmin
}