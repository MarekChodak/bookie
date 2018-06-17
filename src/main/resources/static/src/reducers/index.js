import {combineReducers} from 'redux';
import user from './userReducer';
import users from './usersReducer';
import games from './gamesReducer';
import adminGames from './adminGamesReducer';

const rootReducer = combineReducers({
  user,
  adminGames,
  users,
  games
});

export default rootReducer;
