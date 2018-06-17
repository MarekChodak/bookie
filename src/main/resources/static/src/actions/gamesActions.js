import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import GamesApi from "../api/gamesApi";

export function loadGamesAdminSuccess(games) {
  return {type: types.LOAD_ADMIN_GAMES_SUCCESS  , adminGames: games };
}

export function loadGamesSuccess(games) {
  return {type: types.LOAD_GAMES_SUCCESS  , games: games };
}

export function addGameSuccess(game) {
  return {type: types.ADD_GAME_SUCCESS  , game: game };
}

export function updateGameSuccess(game) {
  return {type: types.UPDATE_GAME_SUCCESS  , game: game };
}

export function saveBetSuccess(game) {
  return {type: types.SAVE_BET_SUCCESS  , game: game };
}

export function loadAdminGames() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return GamesApi.loadAdminGames().then( games => {
      dispatch(loadGamesAdminSuccess(games.data));
    }).catch( error =>{
      throw(error);
    });
  };
}

export function saveBet(game, scoreA, scoreB) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return GamesApi.saveBet(game.id, scoreA, scoreB).then( game => {
      dispatch(saveBetSuccess(game.data));
    }).catch( error =>{
      throw(error);
    });
  };
}

export function loadGames() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return GamesApi.loadGames().then( games => {
      dispatch(loadGamesSuccess(games.data));
    }).catch( error =>{
      throw(error);
    });
  };
}

export function addGame(game) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return GamesApi.addGame(game).then( () => {
      dispatch(addGameSuccess(game));
    }).catch( error =>{
      throw(error);
    });
  };
}

export function updateGame(game) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return GamesApi.updateGame(game).then( () => {
      dispatch(updateGameSuccess(game));
    }).catch( error =>{
      throw(error);
    });
  };
}
