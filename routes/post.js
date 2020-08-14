const express = require('express')
const router = express.Router()

const Post = require('../models/post')
const t = require('../init/tryCatch')
const { ok, fail } = require('../init/responses')
const verify = require('../middleware/verifyToken')

router.post(
  '/createpost',
  verify,
  t(async (req, res) => {
    let { title, body } = req.body
    if (!title || !body) {
      fail(res, 'not all fields')
    }

    let newPost = new Post({ title, body, postedBy: req.user._id })
    let result = await newPost.save()

    ok(res, 'saved', result)
  })
)

module.exports = router
