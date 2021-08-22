import {apiConstants} from '../../constants/api';
import axios from 'axios';
import {Actions, ActionConst} from 'react-native-router-flux';

export function isLoading(bool:Boolean){
  return{
    type:'LOGIN_ATTEMPT',
    isLoading:bool
  }
}

export function loginSuccess(userData:Object){
  return{
    type:'LOGIN_SUCCESS',
    userData
  }
}

export function loginFailed(error:Object){
  return{
    type:'LOGIN_FAILED',
    error
  } 
}

export function login(data:Object){
  return dispatch => {
    dispatch(isLoading(true));

    axios.post(apiConstants.baseurl + '/seller_login',{username: data.username, password: data.password})
    .then((response) => {
      console.debug(JSON.stringify(response.data.message));
      if(response.status < 300 && response.data.username){
        dispatch(isLoading(false))
        dispatch(loginSuccess(response.data));
        console.debug('login success');
        Actions.push('menuScreen');
      }
      else{
          dispatch(isLoading(false));
          dispatch(loginFailed(response.data.message));
          console.debug('login failed');
          Actions.push('loginScreen');
      }
    })
    .catch((error) => {
      console.debug('Catch ERROR');
      dispatch(isLoading(false));
      dispatch(loginFailed(error));
    })
  }
}
