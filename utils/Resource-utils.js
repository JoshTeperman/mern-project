const { Resource, validateResource } = require('../models/Resource')
const mongoose = require('mongoose')

const createResource = async (resourceObject) => {
  const { error } = validateResource(resourceObject)
  if (error) {
    return { error: {
      name: error.name,
      message: error.message,
      status: 400
    }}
  }
  try {
    const newResource = await Resource.create({
      name: resourceObject.name,
      description: resourceObject.description,
      type: resourceObject.type
    })
    console.log(`created New Resource: ${newResource.name}`);
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = {
  createResource
}

