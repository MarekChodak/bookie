import * as types from '../actions/actionTypes';
import InitialState from './initialState';

export default function userReducer(state = InitialState.adminGames, action) {
  switch (action.type) {
    case types.LOAD_ADMIN_GAMES_SUCCESS:
      return action.adminGames;
    case types.ADD_GAME_SUCCESS:
      return [...state, Object.assign({}, action.game)];
    case types.UPDATE_GAME_SUCCESS:
      let game = state.filter(t => t.id === action.game.id)[0];
      let idx = state.indexOf(game);
      let newState =[...state, Object.assign({})];
      newState[idx] = action.game;
      return newState;
    default:
      return state;
  }
}
