import axios from 'axios';

class GamesApi {
  static loadAdminGames() {
    return axios.get('rest/games/adminGames');
  }

  static addGame(game) {
    return axios.post('rest/games/addGame', game);
  }

  static updateGame(game) {
    return axios.post('rest/games/updateGame', game);
  }

  static loadGames() {
    return axios.get('rest/games/games');
  }

  static saveBet(gameId, scoreA, scoreB) {
    return axios.post('rest/games/saveBet', {gameId : gameId, scoreA : scoreA, scoreB : scoreB});
  }
}

export default GamesApi;
