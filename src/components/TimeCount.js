import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import {StyleSheet, View, TextInput, ImageBackground, Text} from 'react-native';

export default class TimeCount extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.Wrapper}>
        <Text style={styles.Text}>PRÓXIMO SORTEIO</Text>
        <Text style={styles.TimeCount}>{Math.floor(this.props.second / 3600)}:{Math.floor(this.props.second / 60) % 60}:{this.props.second % 60}</Text>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Wrapper: {
    alignItems: 'center',
    marginTop: 30
  },
  Text: {
    fontWeight: 'bold',
    fontSize: 40,
    backgroundColor: '#2a2c77',
    color: 'white',
    width: DEVICE_WIDTH - 60,
    textAlign: 'center'
  },
  TimeCount: {
    backgroundColor: 'white',
    fontSize: 50,
    color: 'black',
    width: DEVICE_WIDTH - 60,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
