import * as types from '../actions/actionTypes';
import InitialState from './initialState';

export default function userBabyReducer(state = InitialState.baby, action) {
  switch (action.type) {
    case types.LOAD_USER_BABY_SUCCESS:
      return action.baby;
    case types.BABY_ADDED_SUCCESS:
      return state;
    default:
      return state;
  }
}
