import * as types from '../actions/actionTypes';
import InitialState from './initialState';

export default function userReducer(state = InitialState.user, action) {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
