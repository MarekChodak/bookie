import * as types from './actionTypes';
import UserApi from '../api/userApi';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadUserSuccess(user) {
  return {type: types.LOAD_USER_SUCCESS  , user: user };
}

export function addUserSuccess(user) {
  return {type: types.ADD_USER_SUCCESS  , user: user };
}

export function loadAllUsersSuccess(users) {
  return {type: types.LOAD_ALL_USERS_SUCCESS  , users: users };
}

export function loadUser() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return UserApi.loadUser().then( user => {
      dispatch(loadUserSuccess(user.data));
    }).catch( error =>{
      throw(error);
    });
  };
}

export function loadAllUsers() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return UserApi.loadAllUsers().then( users => {
      dispatch(loadAllUsersSuccess(users.data));
    }).catch( error =>{
      throw(error);
    });
  };
}

export function addUser(user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return UserApi.addUser(user).then( () => {
      dispatch(addUserSuccess(user));
    }).catch( error =>{
      throw(error);
    });
  };
}
