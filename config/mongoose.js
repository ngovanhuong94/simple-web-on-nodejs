var mongoose = require('mongoose')

var DB_URI = process.env.DB_URI

mongoose.connect(DB_URI)

mongoose.connection.on('connected', () => {
  console.log("connected to", DB_URI)
})

mongoose.connection.on('error', (error) => {
  console.log(error)
})

require('../models/User')
require('../models/Post')