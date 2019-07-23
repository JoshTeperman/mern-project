const { Program } = require('../models/Program')

const getProgram = async (req, res) => {
  try {
    const { id } = req.params
    const program = await Program.findOne({ _id: id })
    res.send(program)
  } catch(err) {
    console.log(err.message)
  }
}

const getPrograms = async (req, res) => {
  res.send('get programs endpoint')
}

module.exports = {
  getProgram,
  getPrograms
}