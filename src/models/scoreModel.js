import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const ScoreSchema = new Schema({
    playerIndex: Number,
    score: Number
})

mongoose.model('Score', ScoreSchema)
module.exports.Schema = ScoreSchema
