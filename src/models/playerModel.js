import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const PlayerSchema = new Schema({
    name: String,
    index: Number
})

mongoose.model('Player', PlayerSchema)
module.exports.Schema = PlayerSchema
