const home = (req, res) => {
  res.send('home endpoint')
}

const contact = (req, res) => {
  res.send('contact endpoint')
}

module.exports = {
  home,
  contact
}