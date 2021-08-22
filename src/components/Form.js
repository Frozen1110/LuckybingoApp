import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      isSelected: false
    };
    this.showPass = this.showPass.bind(this);
    this.setSelection = this.setSelection.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }
  
  setSelection() {
    this.setState({isSelected: !this.state.isSelected});
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          value={this.props.username}
          onChange={(val)=>this.props.setUsername(val)}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={this.props.password}
          onChange={(val)=>this.props.setPassword(val)}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.isSelected}
            onValueChange={this.setSelection}
            style={styles.checkbox}
            tintColor='black'
            onCheckColor='black'
            onFillColor='black'
            onTintColor='black'
          />
          <Text style={styles.label}>SALVAR LOGIN</Text>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 65,
    right: 78,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    
  },
  checkbox: {
    alignSelf: "center",
    color: "white",
    backgroundColor: "white"
  },
  label: {
    margin: 8,
    color: "white",
    fontWeight: "bold",
  },
});
