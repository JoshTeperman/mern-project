const home = (req, res) => {
  res.send('home endpoint')
}

const contact = (req, res) => {
  res.send('contact endpoint')
}

const help = (req, res) => {
  res.send('help endpoint')
}

module.exports = {
  home,
  contact,
  help
}