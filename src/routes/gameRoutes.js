import { loginRequired} from '../controllers/userController';
const games = require('../controllers/gameController');


module.exports = function(app) {
  app.route('/game')
    //.get(loginRequired, games.getGames)
    //.post(loginRequired, games.addNewGame);
    .get(games.getGames)
    .post(games.startNewGame);

  app.route('/game/:gameId')
    //.get(loginRequired, games.getGameWithID)
    //.put(loginRequired, games.updateGame)
    //.delete(loginRequired, games.deleteGame);
    .get(games.getGameWithID)
    .put(games.updateGame)
    .delete(games.deleteGame);
  
  //app.route('/game/scores/:gameId')
  //  .get(games.getGameScores)

  app.route('/game/player/:gameId')
    .post(games.addPlayer)

  app.route('/score/:gameId')
    .post(games.addScore)
}
