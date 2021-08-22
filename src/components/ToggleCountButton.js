import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import {StyleSheet, View, TextInput, ImageBackground, Text, Button,TouchableHighlight} from 'react-native';

export default class ToggleCountButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <TouchableHighlight style={styles.touchable} onPress={this.props.onPress}>
          <Text style={[styles.Text,{backgroundColor: this.props.backgroundColor}]}>{this.props.text}</Text>
        </TouchableHighlight>
    );
  }
}

ToggleCountButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Wrapper: {
    textAlign: 'center'
  },
  touchable: {
  },
  Text: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 3,
    paddingBottom: 3,
    color: 'black',
    width: 70,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black'
  }
});
