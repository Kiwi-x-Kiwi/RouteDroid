const mongoose = require('mongoose')
const Schema = mongoose.Schema


const enterpriseSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  location: String
})

const Enterprise = mongoose.model('Enterprise', enterpriseSchema)


module.exports = Enterprise;