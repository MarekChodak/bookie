import * as types from '../actions/actionTypes';
import InitialState from './initialState';

export default function gameReducer(state = InitialState.games, action) {
  switch (action.type) {
    case types.LOAD_GAMES_SUCCESS:
      return action.games;
    case types.SAVE_BET_SUCCESS:
      let game = state.filter(t => t.id === action.game.id)[0];
      let idx = state.indexOf(game);
      let newState = state.slice(0);
      newState[idx] = action.game;
      return newState;
    default:
      return state;
  }
}
