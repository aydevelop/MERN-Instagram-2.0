const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const { MONGOURI } = require('./keys')
const PORT = 5000

//-------------------------------------------------------
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
const db = mongoose.connection
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})

//-------------------------------------------------------
app.use(express.json())
app.use(cors())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
global.t = 123

app.use(function (err, req, res, next) {
  res.status(500).json({
    error: err.message,
  })
})
