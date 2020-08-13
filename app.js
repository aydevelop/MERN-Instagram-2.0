const app = require('express')()
const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')
const PORT = 5000

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})

app.get('/', (req, res) => {
  res.send('Hello world 123!!!!!!!!!!!')
})
