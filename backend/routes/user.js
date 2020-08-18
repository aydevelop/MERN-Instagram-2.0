const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Post = require('../models/post')
const t = require('../init/tryCatch')
const { ok, fail } = require('../init/responses')
const verify = require('../middleware/verifyToken')

router.get(
  '/user/:id',
  verify,
  t(async (req, res) => {
    let id = req.params.id

    let user = await User.findOne({ _id: id }).select('-password')
    if (user) {
      let posts = await Post.find({ postedBy: id })
      return ok(res, 'posts by ' + id, { user, posts })
    }

    fail(res, 'user not exists')
  })
)

module.exports = router
