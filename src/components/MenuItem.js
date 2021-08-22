import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import {StyleSheet, View, TextInput, ImageBackground, Text, Button,TouchableHighlight} from 'react-native';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View style={styles.Wrapper}>
          <TouchableHighlight style={[styles.touchable,{marginTop: this.props.marginTop}]} onPress={this.props.onPress}>
            <Text style={[styles.Text,{backgroundColor: this.props.backgroundColor,fontSize: this.props.fontSize}]}>{this.props.text}</Text>
          </TouchableHighlight>
        </View>
    );
  }
}

MenuItem.propTypes = {
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
    width: DEVICE_WIDTH - 60,
    alignSelf: 'center',
  },
  Text: {
    fontWeight: 'bold',
    paddingTop: 3,
    paddingBottom: 3,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    width: DEVICE_WIDTH - 60,
  }
});
