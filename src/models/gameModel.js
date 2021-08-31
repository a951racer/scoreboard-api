import mongoose from 'mongoose'
//import PlayerSchema from './playerModel'
//import ScoreSchema from './scoreModel'

const Schema = mongoose.Schema
const PlayerSchema = require('./playerModel')
const ScoreSchema = require('./scoreModel')

export const GameSchema = new Schema({
  startedDate: {type: Date, default: Date.now},
  description: String,
  status: {type: String, default: 'new'},
  players: [],
  rounds: []
}, {usePushEach: true});

mongoose.model('Game', GameSchema)