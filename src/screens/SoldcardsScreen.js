import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text,
  Easing,
  ScrollView,
  Alert,
  Switch,
  Modal
} from 'react-native';
import Share from 'react-native-share';
import * as Linking from 'expo-linking';  
import {Actions, ActionConst} from 'react-native-router-flux';

import Title from '../components/Title';
import MenuItem from '../components/MenuItem';
import Wallpaper from '../components/Wallpaper';
import SoldCard from '../components/SoldCard';

import { Dimensions } from 'react-native';
import DateRangePicker from "react-native-daterange-picker";
import { connect } from 'react-redux';

import axios from 'axios';
import {apiConstants} from '../constants/api';


import Toast from 'react-native-simple-toast';
import BluetoothSerial from 'react-native-bluetooth-serial'
import moment from 'moment'

const RNFS = require('react-native-fs');
var Buffer = require('buffer/').Buffer
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
class SoldcardsScreen extends Component {
  constructor(props) {
    super(props);
     this.state = {
        startDate: null,
        endDate: null,
        displayedDate: moment(),
        drawNo: this.props.drawNo,
        seller: this.props.seller,
        drawNumbers : [],
        tickets: [],
        modalVisible : false
      };
  }
  setDates = (dates) => {
    this.setState({
      ...dates,
    });
    const sdate = this.state.startDate?this.state.startDate.format('YYYY-MM-DD'):'';
    const edate = this.state.endDate?this.state.endDate.format('YYYY-MM-DD'):'';
    
    axios.get(apiConstants.baseurl + '/get_ticket?sdate=' + sdate + '&edate=' + edate+'&manager='+'&seller='+this.state.seller+'&number='+this.state.drawNo+'&ticketID=')
    .then(res => {
      console.debug(res.data[0]);
      if(res.data) {
        this.setState({tickets: res.data})
      }
    })
    .catch((error) => {
      console.debug('Catch ERROR');
      console.debug(JSON.stringify(error));
    })
  };
  setDrawNumber = (value) => {
    this.setState({drawNo: value,modalVisible: false});
    const sdate = this.state.startDate?this.state.startDate.format('YYYY-MM-DD'):'';
    const edate = this.state.endDate?this.state.endDate.format('YYYY-MM-DD'):'';
    
    axios.get(apiConstants.baseurl + '/get_ticket?sdate=' + sdate + '&edate=' + edate+'&manager='+'&seller='+this.state.seller+'&number='+this.state.drawNo+'&ticketID=')
    .then(res => {
      console.debug(res.data[0]);
      if(res.data) {
        this.setState({tickets: res.data})
      }
    })
    .catch((error) => {
      console.debug('Catch ERROR');
      console.debug(JSON.stringify(error));
    })
  }
  cancelCard = (ticketID) => {
    console.debug(ticketID);
    Alert.alert(
      'Cancel',
      'Do you really want to cancel this ticket?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: () => {
            axios.post(apiConstants.baseurl + '/cancel_ticket',{ticketID:ticketID})
            .then(res => {
              console.debug(JSON.stringify(res.data));
              if(res.data.result) {
                const isTicket = (element) => element.ticketID == ticketID;
                const tickets = this.state.tickets;
                tickets[tickets.findIndex(isTicket)].status = "CANCEL";
                this.setState({tickets: tickets});
                Toast.show('You cancelled the ticket.', Toast.LONG);
              }
            })
            .catch((error) => {
              console.debug('Catch ERROR');
              console.debug(JSON.stringify(error));
            })
        }}
      ],
      { cancelable: false }
    );
  }
  shareCard = (message,code) => {
     const path = `${RNFS.DocumentDirectoryPath}/1.png`;
        console.debug("code: "+code);
        console.debug("message: "+message);
        RNFS.downloadFile({ fromUrl: apiConstants.baseurl + "/image?code="+code, toFile: `file://${path}` }).promise
            .then((res1) => {
                RNFS.readFile(`file://${path}`).then((res) => {
                      console.debug(res);
                      let shareOptionsUrl = {
                        title: 'BINGO DA STORE',
                        message: message,
                        url: `${res}`, // use image/jpeg instead of image/jpg
                        subject: 'Share information with whatsapp'
                   };
                   Share.open(shareOptionsUrl);
                })
                return res;
            })
            .catch((err) => {
                return err;
            });
        
      
    //Linking.openURL('whatsapp://send?text=https://luckybingo.herokuapp.com/image?code='+code);
  }
  printCard = async (ticketID,client,seller,drawNo,ticketDate,ticketData) => {
    const enabled = BluetoothSerial.isEnabled();
    if(!enabled) {
      Actions.push('bluetoothPrinter2');
    }
    const res = await axios.get(apiConstants.baseurl + '/get_setting')
    const sitename = res.data.sitename;
    BluetoothSerial.write(ticketID+"\n");
    const buf = Buffer.from([27,33,0]);
    const bufFontSize = Buffer.from([27,33,0x38]);
    const bufAlign = Buffer.from([0x1B,'a',0x01]);
    BluetoothSerial.write(buf);
    BluetoothSerial.write(bufAlign);
    BluetoothSerial.write(bufFontSize);
    BluetoothSerial.write("   " +sitename + "\n");
    BluetoothSerial.write(buf);
    BluetoothSerial.write("================================\n");
    BluetoothSerial.write("  ID:"+ticketID+"\n");
    BluetoothSerial.write("  CL:"+client+"\n");
    BluetoothSerial.write("  VD:"+seller+"\n");
    BluetoothSerial.write("  NS:"+drawNo+"\n");
    BluetoothSerial.write("  DT:"+moment(ticketDate.split(" ")[1],"YYYY-MM-DD").format("DD-MM-YYYY")+"\n");
    BluetoothSerial.write("================================\n");
    const ticketDatas= JSON.parse(ticketData);
        
    BluetoothSerial.write(buf);
    BluetoothSerial.write(bufAlign);
    BluetoothSerial.write(bufFontSize);
    for(i = 0 ;i < 3 ;i ++)
    {
        text = " ";
        for( j = 0 ;j < 5 ;j++)
        {
            text=text + Math.floor(ticketDatas[i][j]/10) + (ticketDatas[i][j]%10)
            if(j!= 4)
              text=text + " "
        }
        BluetoothSerial.write(text+"\n");
        if(i < 2)
        {
      //     BluetoothSerial.write("          ├──┼──┼──┼──┼──┤\n");
        }
    }
    
    BluetoothSerial.write(buf);
    //BluetoothSerial.write("          └──┴──┴──┴──┴──┘\n");
    BluetoothSerial.write("\n");
    BluetoothSerial.write("================================\n");
    BluetoothSerial.write("\n");
    BluetoothSerial.write("\n");
  }
  componentDidMount() {
    const sdate = this.state.startDate?this.state.startDate.format('YYYY-MM-DD'):'';
    const edate = this.state.endDate?this.state.endDate.format('YYYY-MM-DD'):'';
    axios.get(apiConstants.baseurl + '/get_ticket?sdate=' + sdate + '&edate=' + edate+'&manager='+'&seller='+this.state.seller+'&number='+this.state.drawNo+'&ticketID=')
    .then(res => {
      console.debug(res.data[0]);
      if(res.data) {
        this.setState({tickets: res.data})
      }
    })
    .catch((error) => {
      console.debug('Catch ERROR');
      console.debug(JSON.stringify(error));
    })
    axios.get(apiConstants.baseurl + '/get_filterd_draw?sdate=' + sdate + '&edate=' + edate)
    .then(res => {
      if(res.data) {
        this.setState({drawNumbers: res.data})
      }
    })
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <Wallpaper>
        <Title backgroundColor="#2a2c7750" color="white" text="BEM VINDO, LOGIN"/>
        <MenuItem backgroundColor="#d21d00" text="3.CARTELAS VENDIDAS" fontSize={30} marginTop={10}/>
        <View style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
              <DateRangePicker
                onChange={this.setDates}
                endDate={this.state.endDate}
                startDate={this.state.startDate}
                displayedDate={this.state.displayedDate}
                range
                containerStyle={{marginTop: -200}}
              >
              <Text style={{marginTop: 20, width: 150,textAlign:'center',backgroundColor:'#2b2b2d',fontSize:25,fontWeight:'bold',color:'white'}}>DATA</Text>
              </DateRangePicker>
            </View>
          <Text onPress={()=>this.setState({modalVisible: true})} style={{marginTop: 20,width: 300,textAlign:'center',backgroundColor:'#2b2b2d',fontSize:25,fontWeight:'bold',color:'white'}}>NUMERO DO SORTEIO</Text>
        </View>
        <View style={{marginTop: 40,flexDirection:'row',width:DEVICE_WIDTH - 80,marginLeft: 40}}>
          <Text style={{height:30,borderWidth:1,borderColor:'black',textAlign:'center',backgroundColor:'#29942e',fontSize:20  ,fontWeight:'bold',color:'white',flex:0.3}}>SORTEIO</Text>
          <Text style={{height:30,borderWidth:1,borderColor:'black',backgroundColor:"yellow",color:'black',fontWeight:'bold',fontSize:20,textAlign:'center',flex: 0.7}}>ID DA CARTELA</Text>
        </View>
        <View style={{marginTop:5,height:300}}>
          <ScrollView style={styles.cardWrapper}>
            {
              this.state.tickets.map((element,index)=>{
                return (
                  <SoldCard ticketData={element.ticketData} image={element.image} message={"ID: "+element.ticketID+"\n"+"VD: "+element.seller+"\n"+"CL: "+element.client+"\n"+"NS: "+element.drawNo+"\n"+"DT: "+moment(element.ticketDate.split(" ")[1],"YYYY-MM-DD").format("DD-MM-YYYY")+"\n"} ticketID={element.ticketID} ticketDate={element.ticketDate} seller={element.seller} client={element.client} code= {element.code} cancelled={element.status=="CANCEL"?true:false} drawNo={this.state.drawNo} ticketID={element.ticketID} key={index} onCancel={this.cancelCard} onPrint={this.printCard} onShare={this.shareCard}/>
                );
              })
            }
          </ScrollView>
        </View>
        <MenuItem backgroundColor="#d21d00" text="VOLTAR" fontSize={30} marginTop={40} onPress={()=>Actions.pop()}/>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {
                this.state.drawNumbers.map((i,index)=>
                  <TouchableOpacity key={index}
                    activeOpacity={0.5} onPress={()=>this.setDrawNumber(i)}>
                      <Text style={{fontSize:20,paddingTop:5,paddingBottom:5,fontWeight:'bold'}}>{i}</Text>
                  </TouchableOpacity>
                )}
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

export default connect(mapStateToProps)(SoldcardsScreen);
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  
  cardWrapper: {
    marginTop: 10,
    backgroundColor: 'pink',
    marginHorizontal: 20,
    paddingBottom: 50
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
    width: 150,
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
  } 
});
