clientData = ['MI Academy', 'Coder Academy', 'Biggin Scott', 'Jellis Craig', 'McDonalds', 'Le Wagon', 'General Assembly']

userData = [
  {
    email: 'student@gmail.com',
    password: 'password',
    role: 'student',
  },
  {
    email: 'student2@gmail.com',
    password: 'password',
    role: 'student',
  },
  {
    email: 'student3@gmail.com',
    password: 'password',
    role: 'student',
  },
  {
    email: 'student3@gmail.com',
    password: 'password',
    role: 'student',
  },
  {
    email: 'student4@gmail.com',
    password: 'password',
    role: 'student',
  },
  {
    email: 'student5@gmail.com',
    password: 'password',
    role: 'student',
  },
]

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

programData = [
  {
    name: 'test program',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores earum commodi, aut quaerat, explicabo odit sapiente maiores corrupti quasi cupiditate, id inventore distinctio? Ad illo eligendi rerum facere nostrum porro.',
    category: 'email marketing',
    startDate: date,
    endDate: new Date(year + 1, month, day),
  },
  {
    name: 'the best milky program',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores earum commodi, aut quaerat, explicabo odit sapiente maiores corrupti quasi cupiditate, id inventore distinctio? Ad illo eligendi rerum facere nostrum porro.',
    category: 'email marketing',
    startDate: date,
    endDate: new Date(year + 1, month, day),
  },
  {
    name: 'super teriffic learning program',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores earum commodi, aut quaerat, explicabo odit sapiente maiores corrupti quasi cupiditate, id inventore distinctio? Ad illo eligendi rerum facere nostrum porro.',
    category: 'email marketing',
    startDate: date,
    endDate: new Date(year + 1, month, day),
  }
]

projectOneData = [
  {
    name: 'First fabulous and teriffic project',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi vitae harum ad est id at facere neque, natus quibusdam porro possimus hic optio odio rerum nesciunt consequatur consequuntur nihil.',
    category: 'online marketing',
    startDate: date,
    endDate: new Date(year, month + 3, day),
  },
  {
    name: 'Second fabulous and teriffic project',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi vitae harum ad est id at facere neque, natus quibusdam porro possimus hic optio odio rerum nesciunt consequatur consequuntur nihil.',
    category: 'online marketing',
    startDate: date,
    endDate: new Date(year, month + 6, day),
  },
  {
    name: 'Third fabulous and teriffic project',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi vitae harum ad est id at facere neque, natus quibusdam porro possimus hic optio odio rerum nesciunt consequatur consequuntur nihil.',
    category: 'online marketing',
    startDate: date,
    endDate: new Date(year, month + 9, day),
  },
  {
    name: 'Fourth fabulous and teriffic project',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi vitae harum ad est id at facere neque, natus quibusdam porro possimus hic optio odio rerum nesciunt consequatur consequuntur nihil.',
    category: 'online marketing',
    startDate: date,
    endDate: new Date(year, month + 12, day),
  }
]

const projectTwoData = [
  {
    name: 'First Incredible Fantasy Trumpernickle Project',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi vitae harum ad est id at facere neque, natus quibusdam porro possimus hic optio odio rerum nesciunt consequatur consequuntur nihil.',
    category: 'online marketing',
    startDate: date,
    endDate: new Date(year, month + 3, day),
  },
  {
    name: 'Second Incredible Fantasy Trumpernickle Project',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi vitae harum ad est id at facere neque, natus quibusdam porro possimus hic optio odio rerum nesciunt consequatur consequuntur nihil.',
    category: 'online marketing',
    startDate: date,
    endDate: new Date(year, month + 6, day),
  },
  {
    name: 'Third Incredible Fantasy Trumpernickle Project',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi vitae harum ad est id at facere neque, natus quibusdam porro possimus hic optio odio rerum nesciunt consequatur consequuntur nihil.',
    category: 'online marketing',
    startDate: date,
    endDate: new Date(year, month + 9, day),
  },
  {
    name: 'Fourth Incredible Fantasy Trumpernickle Project',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi vitae harum ad est id at facere neque, natus quibusdam porro possimus hic optio odio rerum nesciunt consequatur consequuntur nihil.',
    category: 'online marketing',
    startDate: date,
    endDate: new Date(year, month + 12, day),
  },
] 

resourceData = [
  {
    name: 'This is a pdf',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum aperiam quaerat minus voluptatibus? Consequuntur repellendus consectetur, corporis, eos, quasi expedita iure laudantium eligendi animi consequatur architecto quas magni? Minus, earum? Exercitationem quaerat hic qui quos voluptatem pariatur dolor recusandae, odio suscipit, iure temporibus iusto fugiat commodi quae molestiae corporis quod?',
    type: 'pdf'
  },
  {
    name: 'This is a word doc',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum aperiam quaerat minus voluptatibus? Consequuntur repellendus consectetur, corporis, eos, quasi expedita iure laudantium eligendi animi consequatur architecto quas magni? Minus, earum? Exercitationem quaerat hic qui quos voluptatem pariatur dolor recusandae, odio suscipit, iure temporibus iusto fugiat commodi quae molestiae corporis quod?',
    type: 'doc/docx'
  },
  {
    name: 'This is an image',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum aperiam quaerat minus voluptatibus? Consequuntur repellendus consectetur, corporis, eos, quasi expedita iure laudantium eligendi animi consequatur architecto quas magni? Minus, earum? Exercitationem quaerat hic qui quos voluptatem pariatur dolor recusandae, odio suscipit, iure temporibus iusto fugiat commodi quae molestiae corporis quod?',
    type: 'image'
  },
  {
    name: 'This is a url',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum aperiam quaerat minus voluptatibus? Consequuntur repellendus consectetur, corporis, eos, quasi expedita iure laudantium eligendi animi consequatur architecto quas magni? Minus, earum? Exercitationem quaerat hic qui quos voluptatem pariatur dolor recusandae, odio suscipit, iure temporibus iusto fugiat commodi quae molestiae corporis quod?',
    type: 'url'
  },
  {
    name: 'This is a video',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum aperiam quaerat minus voluptatibus? Consequuntur repellendus consectetur, corporis, eos, quasi expedita iure laudantium eligendi animi consequatur architecto quas magni? Minus, earum? Exercitationem quaerat hic qui quos voluptatem pariatur dolor recusandae, odio suscipit, iure temporibus iusto fugiat commodi quae molestiae corporis quod?',
    type: 'video'
  },
  {
    name: 'This is some text',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum aperiam quaerat minus voluptatibus? Consequuntur repellendus consectetur, corporis, eos, quasi expedita iure laudantium eligendi animi consequatur architecto quas magni? Minus, earum? Exercitationem quaerat hic qui quos voluptatem pariatur dolor recusandae, odio suscipit, iure temporibus iusto fugiat commodi quae molestiae corporis quod?',
    type: 'text'
  },
  {
    name: 'This is powerpoint',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum aperiam quaerat minus voluptatibus? Consequuntur repellendus consectetur, corporis, eos, quasi expedita iure laudantium eligendi animi consequatur architecto quas magni? Minus, earum? Exercitationem quaerat hic qui quos voluptatem pariatur dolor recusandae, odio suscipit, iure temporibus iusto fugiat commodi quae molestiae corporis quod?',
    type: 'powerpoint'
  },
  {
    name: 'This is some embedded content',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum aperiam quaerat minus voluptatibus? Consequuntur repellendus consectetur, corporis, eos, quasi expedita iure laudantium eligendi animi consequatur architecto quas magni? Minus, earum? Exercitationem quaerat hic qui quos voluptatem pariatur dolor recusandae, odio suscipit, iure temporibus iusto fugiat commodi quae molestiae corporis quod?',
    type: 'embedded'
  }
]


module.exports = {
  clientData,
  userData,
  programData,
  projectOneData,
  projectTwoData,
  resourceData
}
