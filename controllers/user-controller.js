const analytics = (req, res) => {
  res.send('user analytics endpoint')
}

const profile = (req, res) => {
  res.send('user profile endpoint')
}

const seedUser = (req, res) => {
  console.log('seedUser route');
  const newUser = db.users.insertOne({
    _id: new mongoose.Types.ObjectId(),
    email: 'ianfleming@email.com',
    password: 'password',
    role: 'student',
    clientID: new mongoose.Types.ObjectId(),
  })
  res.json({user: newUser})
}

module.exports = {
  analytics,
  profile,
  seedUser
}