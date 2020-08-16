const express = require('express')
const router = express.Router()

const Post = require('../models/post')
const t = require('../init/tryCatch')
const { ok, fail } = require('../init/responses')
const verify = require('../middleware/verifyToken')

router.get(
  '/allpost',
  verify,
  t(async (req, res) => {
    let posts = await Post.find().populate('postedBy', '_id name')
    ok(res, 'posts', posts)
  })
)

router.post(
  '/createpost',
  verify,
  t(async (req, res) => {
    let { title, body, photo } = req.body
    if (!title || !body || !photo) {
      fail(res, 'not all fields')
    }

    let newPost = new Post({ title, body, photo, postedBy: req.user._id })
    let result = await newPost.save()

    ok(res, 'saved', result)
  })
)

router.get(
  '/myposts',
  verify,
  t(async (req, res) => {
    let posts = await Post.find({ postedBy: req.user._id }).populate(
      'postedBy',
      '_id name'
    )

    ok(res, 'my posts', posts)
  })
)

router.post(
  '/like',
  verify,
  t(async (req, res) => {
    const like = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    ).exec()

    ok(res, 'liked', like)
  })
)

router.post(
  '/unlike',
  verify,
  t(async (req, res) => {
    const unlike = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    ).exec()

    ok(res, 'unliked', unlike)
  })
)

module.exports = router
