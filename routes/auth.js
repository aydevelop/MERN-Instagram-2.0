const express = require('express')
const router = express.Router()
const User = require('../models/user')
const t = require('../init/try-catch')
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
  res.send('hello')
})

router.post(
  '/signup',
  t(async (req, res) => {
    let { name, email, password } = req.body
    if (!email || !password || !name) {
      return res.status(422).json({ error: 'not all fields' })
    }

    let check = await User.findOne({ email: email })
    if (check) {
      return res.status(422).send('user exists')
    }

    password = await bcrypt.hash(password, 12)
    let user = new User({
      name,
      email,
      password,
    })

    let result = await user.save()
    res.send('user saved')
  })
)

module.exports = router
