const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: { type: String, required: true, unique: true },
    temperature: Number,
    condition: String,
    conditionPic: String,
    img: String
})

const City = mongoose.model("city", citySchema)
module.exports = City