const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')
const PORT = 5000

//-------------------------------------------------------
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})

//-------------------------------------------------------
app.use(express.json())
app.use(require('./routes/auth'))

app.use(function (err, req, res, next) {
  res.status(500).json({
    error: err.message,
  })
})
