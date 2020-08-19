const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Post = require('../models/post')
const t = require('../init/tryCatch')
const { ok, fail } = require('../init/responses')
const verify = require('../middleware/verifyToken')
const user = require('../models/user')

router.get(
  '/user/:id',
  verify,
  t(async (req, res) => {
    let id = req.params.id

    let user = await await User.findOne({ _id: id }).select('-password')
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

    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: { followers: req.user._id },
      },
      {
        new: true,
      }
    )

    if (!user) {
      return fail(res, 'user not exists')
    }

    const user2 = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: id },
      },
      {
        new: true,
      }
    ).select('-password')

    ok(res, 'user', { user, user2 })
  })
)

router.post(
  '/unfollow',
  verify,
  t(async (req, res) => {
    let id = req.body.followId

    const user = await User.findByIdAndUpdate(
      id,
      {
        $pull: { followers: req.user._id },
      },
      {
        new: true,
      }
    )

    if (!user) {
      return fail(res, 'user not exists')
    }

    const user2 = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: id },
      },
      {
        new: true,
      }
    ).select('-password')

    ok(res, 'user', { user, user2 })
  })
)

router.post(
  '/search-users',
  verify,
  t(async (req, res) => {
    let = userPattern = new RegExp('^' + req.body.query, 'i')
    let users = await User.find({ name: { $regex: userPattern } }).select(
      '_id email name'
    )
    ok(res, 'users', users)
  })
)

module.exports = router
