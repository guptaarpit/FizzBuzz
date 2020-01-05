const Joi = require('@hapi/joi')

exports.getFizzBuzzReq = Joi.object().keys({
  length: Joi.number().integer().min(1).max(100).default(15),
}).options({ allowUnknown: true })

exports.getFizzBuzzRes = Joi.array().items(Joi.object()).allow(null, '').empty(['', null]).default([]);