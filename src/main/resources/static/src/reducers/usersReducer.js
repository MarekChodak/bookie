import * as types from '../actions/actionTypes';
import InitialState from './initialState';

export default function usersReducer(state = InitialState.users, action) {
  switch (action.type) {
    case types.LOAD_ALL_USERS_SUCCESS:
      return action.users;
    case types.ADD_USER_SUCCESS:
      return [...state, Object.assign({}, action.user)];
    default:
      return state;
  }
}
