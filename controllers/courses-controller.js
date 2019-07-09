const allCourses = (req, res) => {
  res.send('all courses endpoint')
}

const course = (req, res) => {
  res.send('single course endpoint')
}

const lesson = (req, res) => {
  res.send('single lesson endpoint')
}

module.exports = {
  allCourses,
  course,
  lesson
}