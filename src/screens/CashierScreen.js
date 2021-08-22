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
  Dimensions,
  Modal,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Actions, ActionConst} from 'react-native-router-flux';

import Wallpaper from '../components/Wallpaper';
import Title from '../components/Title';
import MenuItem from '../components/MenuItem';

import moment from "moment";
import Dates from 'react-native-dates';
import { connect } from 'react-redux';
import SelectInput from 'react-native-select-input-ios'

import axios from 'axios';
import {apiConstants} from '../constants/api';


import CheckBox from '@react-native-community/checkbox';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
class CashierScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        startDate: null,
        endDate: null,
        displayedDate: moment(),
        drawNo: this.props.drawNo,
        seller: this.props.seller,
        drawNumbers : [],
        extract: '',
        exit: '',
        commission: '',
        final: '',
        modalVisible: true,
        filterMode : 1,
        date: null,
        focus: 'startDate',
        isSelected : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        selectedNumbers : [],
      };
  }
  filterResult = () => {
    const filterMode = this.state.filterMode;
    this.setState({modalVisible:false});
    if(filterMode == '0' ) {
      const sdate = this.state.startDate?this.state.startDate.format('YYYY-MM-DD'):'';
      const edate = this.state.endDate?this.state.endDate.format('YYYY-MM-DD'):'';
      console.log('request');
      console.log(apiConstants.baseurl + '/get_draw_result_total?sdate='+sdate + '&edate=' + edate + '&seller=' + this.state.seller);
      axios.get(apiConstants.baseurl + '/get_draw_result_total?sdate='+sdate + '&edate=' + edate + '&seller=' + this.state.seller)
      .then(res => {
        this.setState({extract: res.data.extract,exit: res.data.exit,commission:res.data.commission,final:res.data.final})
        
      })
      .catch((error) => {
        console.debug('Catch ERROR');
      })    
    }
    else {
      var i;
      const selectedNumbers = [];
      for(i = 0 ;i < this.state.drawNumbers.length;i ++) {
        if(this.state.isSelected[i] === 1) {
          selectedNumbers.push(this.state.drawNumbers[i]);
        }
      }
      this.setState({selectedNumbers: selectedNumbers});
      axios.get(apiConstants.baseurl + '/get_draw_result_draw?sdate=&edate=&drawNo='+selectedNumbers.join(",")+'&seller='+this.state.seller)
      .then(res => {
        console.log(res.data);
        var extract = 0 ,exit = 0, commission = 0, final = 0;
        for(var i =0 ;i< res.data.length; i++) {
          extract += res.data[i].extract;
          exit += res.data[i].exit;
          commission += res.data[i].commission;
          final += res.data[i].final;
        }
        this.setState({extract: Math.round(extract * 10) / 10,exit: Math.round(exit * 10) / 10,commission:Math.round(commission * 10) /10,final: Math.round(final * 10) / 10})
      })
      .catch((error) => {
        console.debug('Catch ERROR');
        console.debug(JSON.stringify(error));
      })  
    }
  }
  setSelection = (index) => {
    const selected = this.state.isSelected;
    selected[index] = 1 - selected[index];
    this.setState({isSelected: selected});
  }
  componentDidMount() {
    axios.get(apiConstants.baseurl + '/get_filterd_draw?sdate=&edate=')
    .then(res => {
      if(res.data) {
        this.setState({drawNumbers: res.data})
      }
    })
    .catch((error) => {
      console.debug('Catch ERROR');
    })
  }
  
  render() {
    const isDateBlocked = (date) =>
      false;
    
  const setDates = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () => {
        this.setState({ ...this.state, startDate, endDate })
        this.setState({filterMode: 0})
      }
      );
      
    const { modalVisible } = this.state;
    return (
      <Wallpaper>
        <Title backgroundColor="#2a2c7750" color="white" text="BEM VINDO, LOGIN"/>
        <MenuItem backgroundColor="#ec9b22" text="2.CAIXA" fontSize={30} marginTop={10}/>
        <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Text onPress={()=>this.setState({modalVisible:true})} style={{marginTop: 20, width: 150,textAlign:'center',backgroundColor:'#2b2b2d',fontSize:25,fontWeight:'bold',color:'white'}}>DATA</Text>
            </View>
             <View>
                <Text onPress={()=>this.setState({modalVisible:true})} style={{marginTop: 20,width: 300,textAlign:'center',backgroundColor:'#2b2b2d',fontSize:25,fontWeight:'bold',color:'white'}}>Número do sorteio</Text>
             </View>
        </View>
        <View style={{marginTop: 20, marginLeft: 30, marginBottom: 7}}>
          {
            this.state.filterMode === 0?
          <Text style={{marginTop: 10,color: 'black',fontSize: 15,fontWeight: 'bold'}}>DATA: {this.state.startDate?this.state.startDate.format('D/M'):''} - {this.state.endDate?this.state.endDate.format('D/M'):''}</Text>
          :
          <Text style={{marginTop: 10,color: 'black',fontSize: 15,fontWeight: 'bold'}}>SORTEIO: {this.state.selectedNumbers.join(',')}</Text>
          }
        </View>
        <Text style={{marginLeft: 30,fontSize:12,color:'black',marginTop:7}}>EXTRADA</Text>
        <MenuItem backgroundColor="#29942e" text={"$ "+this.state.extract} fontSize={30} marginTop={3}/>
        <Text style={{marginLeft: 30,fontSize:12,color:'black',marginTop:7}}>SAIDA</Text>
        <MenuItem backgroundColor="#d21d00" text={"$ -"+this.state.exit} fontSize={30} marginTop={3} />      
        <Text style={{marginLeft: 30,fontSize:12,color:'black',marginTop:7}}>COMISSÃO</Text>
        <MenuItem backgroundColor="#163988" text={"$ -"+this.state.commission} fontSize={30} marginTop={3}/>     
        <Text style={{marginLeft: 30,fontSize:12,color:'black',marginTop:7}}>SALDO FINAL</Text>
        <MenuItem backgroundColor="#13b7d2" text={"$ "+this.state.final} fontSize={30} marginTop={3}/>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <RNPickerSelect
                onValueChange={(value) => {this.setState({filterMode: value});console.log(value);}}
                items={[
                    { label: 'Sorteio',  value : 1},
                    { label: 'Data', value: 0},
                ]}
                selectedValue={1}
                placeholder= {{}}
            />
        {
          this.state.filterMode === 1?
            <View>
              {
                this.state.drawNumbers.map((i,index)=>
                <View style={styles.checkboxContainer} key={index}>
                  <CheckBox
                    value={this.state.isSelected[index] === 0? false: true}
                    onValueChange={()=>this.setSelection(index)}
                    style={styles.checkbox}
                    tintColor='black'
                    onCheckColor='black'
                    onFillColor='black'
                    onTintColor='black'
                  />
                  <Text style={styles.label}>{i}</Text>
                </View>
                )}
            </View>
          :
            <View style={{width: DEVICE_WIDTH - 20}}>
              <Dates
                onDatesChange={setDates}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                isDateBlocked={isDateBlocked}
                focusedInput={this.state.focus}
                range
              />
            </View>
          }
          <View>
            <TouchableOpacity activeOpacity={0.5} onPress={()=>this.filterResult()}>
              <Text style={{fontSize:20,paddingTop:5,paddingBottom:5,fontWeight:'bold',color:'white',backgroundColor:"#29942e",paddingLeft:10,paddingRight:10,marginTop: 20}}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        </Modal>
        {modalVisible?<View style={styles.overlay} />:<></>}
        
     </Wallpaper>
     
    );
  }
}
const mapStateToProps = state => ({
  drawNo: state.auth.draw,
  seller: state.auth.userData.username
});

export default connect(mapStateToProps)(CashierScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "column",
    width: DEVICE_WIDTH - 20,
    maxHeight: 500
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  } ,
  dateContainer: {
    flex: 1,
    flexGrow: 1,
    marginTop: 20,
    width: 400
  } ,
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
    color: "#222",
    fontWeight: "bold",
  }
});
