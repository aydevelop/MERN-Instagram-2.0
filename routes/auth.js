const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const t = require('../init/try-catch')
const { ok, fail } = require('../init/responses')
const { JWT_SECRET } = require('../keys')

router.get('/', (req, res) => {
  res.send('hello')
})

router.post(
  '/signup',
  t(async (req, res) => {
    let { name, email, password } = req.body
    if (!email || !password || !name) {
      return fail(res, 'not all fields')
    }

    let check = await User.findOne({ email: email })
    if (check) {
      return fail(res, 'user exists')
    }

    password = await bcrypt.hash(password, 12)
    let user = new User({
      name,
      email,
      password,
    })

    let newUser = await user.save()
    ok(res, 'user saved')
  })
)
router.post(
  '/signin',
  t(async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) {
      return fail(res, 'add email or password')
    }

    let user = await User.findOne({ email: email })
    if (!user) {
      return fail(res, 'invalid email or password')
    }

    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return fail(res, 'invalid password')
    }

    let token = jwt.sign({ _id: user._id }, JWT_SECRET)

    ok(res, 'signed in', { token })
  })
)

module.exports = router
