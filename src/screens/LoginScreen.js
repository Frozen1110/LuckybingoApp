import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/Logo';
import Form from '../components/Form';
import Wallpaper from '../components/Wallpaper';
import ButtonSubmit from '../components/ButtonSubmit';
import {View,Text,StyleSheet} from 'react-native';
import { login } from '../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { HelperText } from 'react-native-paper';

export default function LoginScreen(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSave,setLoginSave] = useState(false);
  const dispatch = useDispatch();
  const [error, setError]  = useState(useSelector(state => state.auth.error));
  const validation = () => {
    console.debug('validation started');
    if(username == "") {
      setError("Username can't be empty");
      return false;
    } else if(password == "") {
      setError("Password can't be empty");
      return false;
    }
    return true;
  }
  return (
    <Wallpaper>
      <Logo />
      <Text style={styles.error}>{error}</Text>
      <Form username={username} password={password} loginSave={loginSave} setUsername={(val)=>{val==setUsername(val);}} setPassword={(val)=>setPassword(val)}/>
      <ButtonSubmit onValidate={validation} onPress={()=>dispatch(login({username:username,password:password}))}/>
    </Wallpaper>
  );  
}
const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
  }
});