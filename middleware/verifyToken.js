const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const User = require('../models/user')

module.exports = (req, res, next) => {
  let { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ error: 'you must be logged in' })
  }

  let token = authorization.replace('Bearer ', '')
  jwt.verify(token, JWT_SECRET, async (error, payload) => {
    if (error) {
      return res.status(401).json({ error: 'you must be logged in' })
    }

    let { _id } = payload
    let user = await User.findById({ _id })
    if (user) {
      req.user = user
    }

    next()
  })
}
