import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import {StyleSheet, View, TextInput, ImageBackground} from 'react-native';
import MenuItem from './MenuItem';

import {Actions, ActionConst} from 'react-native-router-flux';

import Toast from 'react-native-simple-toast';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Menu extends Component {
  render() {
    return (
      <View style={{alignSelf:'center',width:DEVICE_WIDTH-60,marginTop:20}}>
        <MenuItem marginTop={15} fontSize={30} backgroundColor='#29942e' text='1.NOVA VENDA' onPress={()=>this.props.drawNo!=-1?Actions.newsaleScreen1({drawDate:this.props.drawDate}):Toast.show('There are no active draws.',Toast.LONG)}/>
        <MenuItem marginTop={15} fontSize={30} backgroundColor='#ec9b22' text='2.CAIXA' onPress={()=>Actions.push('cashierScreen')}/>
        <MenuItem marginTop={15} fontSize={30} backgroundColor='#d21d00' text='3.CARTELAS VENDIDAS' onPress={()=>Actions.push('soldcardsScreen')}/>
        <MenuItem marginTop={15} fontSize={30} backgroundColor='#163988' text='4.RESULTADOS' onPress={()=>Actions.push('resultScreen')}/>
        <MenuItem marginTop={60} fontSize={30} backgroundColor='#64686f' text='5.CONFIGURAÇÕES' onPress={()=>Actions.push('settingsScreen')}/>
        <MenuItem marginTop={15} fontSize={30} backgroundColor='#222' text='SAIR' onPress={()=>Actions.push('loginScreen')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
