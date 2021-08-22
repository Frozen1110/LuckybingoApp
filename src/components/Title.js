import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import {StyleSheet, View, TextInput, ImageBackground, Text} from 'react-native';

export default class Title extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.Wrapper}>
        <Text style={[styles.Text,{backgroundColor: this.props.backgroundColor,color: this.props.color}]}>{this.props.text}</Text>
      </View>
    );
  }
}

Title.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Wrapper: {
    marginTop: 50,
  },
  Text: {
    fontWeight: 'bold',
    fontSize: 40,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
  }
});
