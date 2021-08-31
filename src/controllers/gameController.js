import _ from 'lodash'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = mongoose.model('Game');
const Player = mongoose.model('Player')
const Score = mongoose.model('Score')

exports.startNewGame = (req, res) => {
  let newGame = new Game(req.body);
  newGame.save((err, game) => {
      if (err) {
          res.send(err);
      }
      res.json(game);
  });
};

exports.getGames = (req, res) => {
  Game.find()
    .sort({startedDate: 1})
    .exec((err, game) => {
    if (err) {
        res.send(err);
    }
    res.json(game);
  });
};

exports.getGameWithID = (req, res) => {
  Game.findById(req.params.gameId, (err, game) => {
    if (err) {
        res.send(err);
    }
    res.json(game);
  });
}

/*
exports.getGameScores = (req, res) => {
  Game.findById(req.params.gameId, (err, game) => {
    if (err) {
        res.send(err);
    }
    let scores = []
    let players = []
    let playerIndex = 1
    game.players.forEach(player => {
      players.push({'name': player.name, 'index': playerIndex})
      player.scores.forEach(score => {
        let roundEntry = {
          'round': score.round,
          'score': {
            'playerIndex': playerIndex,
            'score': score.score
          }
        }
        scores.push(roundEntry)
      })
      playerIndex++
    });
    let gameData = {
      'description': game.description,
      'startedDate': game.startedDate
    }
    let response = {
      game: gameData,
      players: players,
      scores: scores
    }
    console.log(response)
    res.json(response);
  });
}
*/

exports.updateGame = (req, res) => {
  Game.findOneAndUpdate({ _id: req.params.gameId}, req.body, { new: true }, (err, game) => {
    if (err) res.send(err)
    res.json(game)
  })
}

exports.addPlayer = (req, res) => {
  let id = req.params.gameId
  Game.findById(id, (err, game) => {
    if (err) res.send(err)
    let player = new Player(req.body)
    player.index = nextPlayerIndex(game)
    game.players.push(player)
    game.save((err, game) => {
      if (err) res.send(err)
      res.json(game);
    });
  });
}

exports.addScore = (req, res) => {
  let gameId = req.params.gameId
  let { round, playerIndex, score} = req.body
  let newScore
  Game.findById(gameId, (err, game) => {
    if (err) res.send(err)
    let roundIndex = _.findIndex(game.rounds, (gameRound) => {
      console.log(gameRound.index, round)
      return gameRound.index === round
    })
    console.log(roundIndex)
    if (roundIndex < 0) {
      game.rounds.push({
        index: round,
        scores: [{playerIndex: playerIndex, score: score}]
      })
    } else {
      game.rounds[roundIndex].scores.push({playerIndex: playerIndex, score: score})
    }
    game.status = 'in progress'
    Game.findOneAndUpdate({ _id: game._id}, game.toObject(), { new: true }, (err, savedGame) => {
      if (err) res.send(err)
      res.json(savedGame);
    });
  });
}

exports.deleteGame = (req, res) => {
  Game.remove({ _id: req.params.gameId }, (err, game) => {
    if (err) {
        res.send(err);
    }
    res.json({ message: 'Successfully deleted Game'});
  })
}

function nextPlayerIndex(game) {
  let max = 0
  game.players.forEach(player => {
    if (player.index > max) max = player.index
  });
  return max + 1
}