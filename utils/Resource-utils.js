const { Resource, validateResource } = require('../models/Resource')

const createResource = async (resourceObject) => {
  const { error } = validateResource(resourceObject)
  if (error) {
    return { error }
  }
  try {
    return await Resource.create({
      _id: resourceObject._id,
      name: resourceObject.name,
      description: resourceObject.description,
      type: resourceObject.type
    })
  } catch(error) {
    console.log(error.message)
    return { error }
  }
}

module.exports = {
  createResource
}

