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

router.post(
  '/follow',
  verify,
  t(async (req, res) => {
    let id = req.body.followId

    let user = await User.findByIdAndUpdate(id, {
      $push: { followers: req.user._id },
    })

    if (!user) {
      return fail(res, 'user not exists')
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: { following: id },
    })
  })
)

router.post(
  '/unfollow',
  verify,
  t(async (req, res) => {
    let id = req.body.unfollowId

    let user = await User.findByIdAndUpdate(id, {
      $pull: { followers: req.user._id },
    })

    if (!user) {
      return fail(res, 'user not exists')
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: id },
    })
  })
)

module.exports = router
