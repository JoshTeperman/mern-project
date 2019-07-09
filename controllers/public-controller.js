const home = (req, res) => {
  res.send('home endpoint')
}

const about = (req, res) => {
  res.send('about endpoint')
}

const contact = (req, res) => {
  res.send('contact endpoint')
}

module.exports = {
  home,
  about,
  contact
}