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
    let posts = await Post.find()
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name')
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
    let posts = await Post.find({ postedBy: req.user._id })
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name')

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
    )
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name')

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
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name')

    ok(res, 'unliked', unlike)
  })
)

router.post(
  '/comment',
  verify,
  t(async (req, res) => {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    }

    const unlike = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    ).populate('comments.postedBy', '_id name')

    ok(res, 'comment saved', unlike)
  })
)

router.delete(
  '/deletepost/:postId',
  verify,
  t(async (req, res) => {
    let post = await Post.findOne({ _id: req.params.postId }).populate(
      'postedBy',
      '_id name'
    )

    if (post.postedBy._id.toString() == req.user._id.toString()) {
      await post.remove()
      ok(res, 'deleted')
    } else {
      fail(res, 'error')
    }
  })
)

module.exports = router
