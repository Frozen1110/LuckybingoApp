import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions,KeyboardAvoidingView } from 'react-native';
import {StyleSheet, ImageBackground} from 'react-native'; 

import bgSrc from '../images/wallpaper.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default class Wallpaper extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.KeyboardAvoidingContainer} behavior="padding" style={{width:"100%",height:"100%"}}>
        <ImageBackground style={styles.picture} source={bgSrc}>
          {this.props.children}
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    resizeMode: 'cover',
  },
  KeyboardAvoidingContainer: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT
  },
});
