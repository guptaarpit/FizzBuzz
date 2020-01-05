'use strict'

const { getFizzBuzzReq, getFizzBuzzRes } = require(
  '../schema/main')
const Joi = require('@hapi/joi')

module.exports = (app, controller) => {
  console.log('Message')
  app.route({
    method: 'GET', path: '/', options: {
      description: 'Retreive Fuzz Buzz Result',
      validate: {
        query: getFizzBuzzReq,
      }, tags: ['api', 'fuzz', 'buzz'],
      response: {
        schema: Joi.object().keys({
          status: Joi.boolean().allow(null, '').empty([null, '']).default(false), result: getFizzBuzzRes,
          length: Joi.number().allow(null, '').empty([null, '']).default(15),
          message: Joi.string().allow(null, '').empty([null, '']).default('Successful'),
        }),
        options: { stripUnknown: { objects: true, arrays: false } },
        failAction: async (req, h, err) => {
          if (err) {
            console.log(`Server error: ${err}`)
            return h.response({ status: false, message: 'Failed' })
          }
        }, modify: true,
      },
    },
    handler: controller.retrieveFizzBuzz,
  });
}
