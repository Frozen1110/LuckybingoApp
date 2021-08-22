import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import Title from '../components/Title';
import MenuItem from '../components/MenuItem';
import Wallpaper from '../components/Wallpaper';
import SoldCard from '../components/SoldCard';

import { Dimensions } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {apiConstants} from '../constants/api';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      drawNo: null,
      allDraw: [],
      linha : [],
      bingo : null,
      accumulated : null
    }
  }
  componentDidMount() {
    axios.get(apiConstants.baseurl + '/get_all_passed_draws')
    .then(res => {
      if(res.data.passed) {
        this.setState({allDraw:res.data.passed});
      }
    })
  }
  render() {
    const dropDown = []
    this.state.allDraw.map((i)=>{
      dropDown.push({label: i.toString(), value: i});
    })
    return (
      <Wallpaper>
        <Title backgroundColor="#2a2c7750" color="white" text="BEM VINDO, LOGIN"/>
        <MenuItem backgroundColor="#163988" text="4.RESULTADOS" fontSize={30} marginTop={10}/>
        <View style={{alignItems: 'center'}}>
          <Text style={{marginTop: 20,width: 300,textAlign:'center',backgroundColor:'#2b2b2d',fontSize:25,fontWeight:'bold',color:'white'}}>NUMERO DO SORTEIO</Text>
        </View>
        <View style={{marginTop: 20,alignItems:'center'}}>
          <Text style={{backgroundColor:"#29942e",color:'white',fontSize:25,fontWeight:'bold',textAlign:'center',width:150,borderWidth:1,borderColor:'black'}}>SORTEIO</Text>
          <DropDownPicker
                items={dropDown}
                containerStyle={{height: 40}}
                style={{marginTop: 3,backgroundColor:"white",color:'black',fontSize:25,fontWeight:'bold',textAlign:'center',width:150,borderWidth:1,borderColor:'black'}}
                itemStyle={{
                    justifyContent: 'flex-start',
                    fontWeight: 'bold',
                    color: 'black'
                }}
                dropDownStyle={{backgroundColor: '#fafafa',width:150}}
                onChangeItem={item => {
                  this.setState({
                    drawNo: item.value
                  })
                  this.setState({linha:[],bingo:null,accumulated:null});
                  axios.get(apiConstants.baseurl + '/get_premium_cards?drawNo='+item.value)
                  .then(res => {
                    const linha = []
                    res.data.map((i) => {
                      if(i.premium == "LINHA") {
                        linha.push(i.ticketID)
                      }
                      if(i.premium == "BINGO") {
                        this.setState({bingo:i.ticketID})
                      }
                      if(i.premium == "ACCUM") {
                        this.setState({accumulated:i.ticketID})
                      }
                    })
                    this.setState({linha:linha})
                  })
                }}
          />
        </View>
        <View style={{marginTop: 40,alignItems:'center',width:300,height:40,flexDirection:'row',alignSelf:'center'}}>
          <Text style={{borderWidth:1,borderColor:'black',backgroundColor:'yellow',fontSize:20,fontWeight:'bold',color:'black',textAlign:'center',flex:0.7}}>ID DA CARTELA</Text>
          <Text style={{borderWidth:1,borderColor:'black',backgroundColor:'#29942e',fontSize:20,fontWeight:'bold',color:'white',textAlign:'center',flex:0.3}}>PREMIO</Text>
        </View>
        {this.state.linha.map((i)=> {
          return (
            <View style={{alignItems:'center',width:300,flexDirection:'row',alignSelf:'center'}}>
              <Text style={{height:40,borderWidth:1,borderColor:'black',backgroundColor:'white',fontSize:20,color:'black',textAlign:'center',flex:0.7}}>{i}</Text>
              <Text style={{height:40,borderWidth:1,borderColor:'black',backgroundColor:'white',fontSize:20,color:'black',textAlign:'center',flex:0.3}}>LINHA</Text>
            </View>
          );
        })
        }
        {this.state.bingo?
        <View style={{alignItems:'center',width:300,height:40,flexDirection:'row',alignSelf:'center'}}>
          <Text style={{height:40,borderWidth:1,borderColor:'black',backgroundColor:'white',fontSize:20,color:'black',textAlign:'center',flex:0.7}}>{this.state.bingo}</Text>
          <Text style={{height:40,borderWidth:1,borderColor:'black',backgroundColor:'white',fontSize:20,color:'black',textAlign:'center',flex:0.3}}>BINGO</Text>
        </View> :<View></View>
        }
        {this.state.accumulated ?
        <View style={{alignItems:'center',width:300,height:40,flexDirection:'row',alignSelf:'center'}}>
          <Text style={{height:40,borderWidth:1,borderColor:'black',backgroundColor:'white',fontSize:20,color:'black',textAlign:'center',flex:0.7}}>{this.state.bingo}</Text>
          <Text style={{height:40,borderWidth:1,borderColor:'black',backgroundColor:'white',fontSize:20,color:'black',textAlign:'center',flex:0.3}}>ACCUMU</Text>
        </View> : <View></View>}
        <MenuItem backgroundColor="#d21d00" text="VOLTAR" fontSize={30} marginTop={150} onPress={()=>Actions.pop()}/>
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
