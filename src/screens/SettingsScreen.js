import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  Text
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import Toast from 'react-native-simple-toast';
import Title from '../components/Title';
import MenuItem from '../components/MenuItem';
import Wallpaper from '../components/Wallpaper';
import SoldCard from '../components/SoldCard';

import { Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state={
      login: true,
      bluetooth: 58
    }
  }

  render() {
    return (   
      <Wallpaper>
        <Title backgroundColor="#2a2c7750" color="white" text="BEM VINDO, LOGIN"/>
        <MenuItem backgroundColor="#64686f" text="5.CONFIGURAÇÕES" fontSize={30} marginTop={10}/>
        <Text style={{paddingTop:6,paddingBottom:6,textAlign:'center',width:DEVICE_WIDTH-60,alignSelf:'center',backgroundColor:'#163988',color:'white',fontSize:25,marginTop:40}}>SALVAR DADOS DE LOGIN</Text>
        <View style={{marginTop:3,flexDirection:'row',justifyContent:'space-between',width:300,alignSelf:'center'}}>
          <Text style={{backgroundColor:this.state.login?'#29942e':'#d21d00',color:'white',fontSize:25,textAlign:'center',width:140,height:40}} onPress={()=>this.setState({login: true})}>SIM</Text>
          <Text style={{backgroundColor:this.state.login?'#d21d00':'#29942e',color:'white',fontSize:25,textAlign:'center',width:140,height:40}} onPress={()=>this.setState({login: false})}>NÃO</Text>
        </View>
        <Text style={{paddingTop:6,paddingBottom:6,textAlign:'center',width:DEVICE_WIDTH-60,alignSelf:'center',backgroundColor:'#163988',color:'white',fontSize:25,marginTop:40}}>IMPRESSÃO BLUETOOTH</Text>
        <View style={{marginTop:3,flexDirection:'row',justifyContent:'space-between',width:300,alignSelf:'center'}}>
          <Text style={{backgroundColor:this.state.bluetooth==58?'#29942e':'#d21d00',color:'white',fontSize:25,textAlign:'center',width:140,height:40}}  onPress={()=>this.setState({bluetooth: 58})}>58MM</Text>
          <Text style={{backgroundColor:this.state.bluetooth==88?'#29942e':'#d21d00',color:'white',fontSize:25,textAlign:'center',width:140,height:40}}  onPress={()=>this.setState({bluetooth: 88})}>80MM</Text>
        </View>
        <MenuItem backgroundColor="#29942e" text="CONNECT PRINTER" fontSize={30} marginTop={30} onPress={()=>Actions.push('bluetoothPrinter2')}/>
        <MenuItem backgroundColor="#29942e" text="SALVAR" fontSize={30} marginTop={140} onPress={()=>Toast.show('Settings saved successfully',Toast.LONG)}/>
        <MenuItem backgroundColor="#d21d00" text="VOLTAR" fontSize={30} marginTop={30} onPress={()=>Actions.pop()}/>
  
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
