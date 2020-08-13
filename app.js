const app = require('express')()
const PORT = 5000
const { MONGOURI } = require('./keys')
const mongoose = require('mongoose')

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
