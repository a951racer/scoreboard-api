import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const RoundSchema = new Schema({
    round: Number,
    score: Number
})

mongoose.model('Round', RoundSchema)