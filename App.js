import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Routes from './Routes.js';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import * as authActions from './src/redux/actions/authActions';

export default function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});