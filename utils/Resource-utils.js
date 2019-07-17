const { Resource, validateResource } = require('../models/Resource')

const createResource = async (resourceObject) => {
  const { error } = validateResource(resourceObject)
  if (error) {
    console.log(error.message);
    return { error: {
      name: error.name,
      message: error.message,
      status: 400
    }}
  } else {
    try {
      return await Resource.create({
        name: resourceObject.name,
        description: resourceObject.description,
        type: resourceObject.type
      })
    } catch(err) {
      console.log(err.message)
    }
  }
}

module.exports = {
  createResource
}

