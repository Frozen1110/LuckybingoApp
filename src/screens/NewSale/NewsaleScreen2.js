import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Modal,
  Image,
  Dimensions
} from 'react-native';

import Share from 'react-native-share';
import BluetoothSerial from 'react-native-bluetooth-serial'
import moment from 'moment'
import {Actions,} from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import Card from '../../components/Card';
import Wallpaper from '../../components/Wallpaper';
import MenuItem from '../../components/MenuItem';

import axios from 'axios';
import {apiConstants} from '../../constants/api';

import printImg from '../../images/print.png';
import shareImg from '../../images/share.png';
import backImg from '../../images/back.png';

var Buffer = require('buffer/').Buffer
const RNFS = require('react-native-fs');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
class NewsaleScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state= {
      ticketCount: this.props.ticketCount,
      ticketData: [],
      client: '',
      draw: this.props.drawNo,
      drawDate: this.props.drawDate,
      seller: this.props.seller,
      ticketValue: 0,
      modalVisible: false,
      codes : []
    }
    this.confirmTicket = this.confirmTicket.bind(this);
  }
  
  componentDidMount() {
    axios.post(apiConstants.baseurl + '/create_ticket',{ticketCount: this.state.ticketCount,seller: this.state.seller,drawNo: this.state.draw})
    .then(res => {
      console.debug(JSON.stringify(res.data));
      if(res.data.ticket) {
        this.setState({ticketData: res.data.ticket,ticketValue: res.data.ticket[0].ticketValue})
      }
    })
    .catch((error) => {
      console.debug('Catch ERROR');
      console.debug(JSON.stringify(error));
    })
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  confirmTicket() {
    const ticketIDs = [];
    const ticketDatas = [];
    this.state.ticketData.map((element,index)=>{
      ticketIDs.push(element.ticketID);
      ticketDatas.push(element.ticketData);
    })
    axios.post(apiConstants.baseurl + '/confirm_ticket',{ticketCount: this.state.ticketCount,seller: this.state.seller,drawNo: this.state.draw,client: this.state.client,ticketDatas:ticketDatas,ticketIDs:ticketIDs})
    .then(res => {
      if(res.data.confirm == 'success') {
        Toast.show('Tickets are generated.', Toast.LONG);
        this.setModalVisible(true);
        this.setState({codes: res.data.code})
      } else if(res.data.confirm == 'exist') {
        Toast.show('You already generated Tickets', Toast.LONG);
      }else if(res.data.confirm == 'passed') {
        Toast.show('Passed sales closing date.', Toast.LONG);
      }
    })
    .catch((error) => {
      console.debug('Catch ERROR');
      console.debug(JSON.stringify(error));
    })
  }
  printTickets = async () => {
    const enabled = BluetoothSerial.isEnabled();
    if(!enabled) {
      Actions.push('bluetoothPrinter2');
    }
    
    const buf = Buffer.from([27,33,0]);
    const bufFontSize = Buffer.from([27,33,0x38]);
    const bufAlign = Buffer.from([0x1B,'a',0x01]);
    const res = await axios.get(apiConstants.baseurl + '/get_setting')
    const sitename = res.data.sitename;
    this.state.ticketData.map((i)=> {
      BluetoothSerial.write(i.ticketID+"\n");
      BluetoothSerial.write(buf);
      BluetoothSerial.write(bufFontSize);
      BluetoothSerial.write(bufAlign);
      BluetoothSerial.write("   " + sitename + "\n");
      BluetoothSerial.write(buf);
      BluetoothSerial.write("================================\n");
      BluetoothSerial.write("  ID:"+i.ticketID+"\n");
      BluetoothSerial.write("  CL:"+this.state.client+"\n");
      BluetoothSerial.write("  VD:"+this.state.seller+"\n");
      BluetoothSerial.write("  NS:"+this.state.draw+"\n");
      BluetoothSerial.write("  DT:"+moment(this.state.drawDate.split(" ")[1],"YYYY-MM-DD").format("DD-MM-YYYY")+"\n");
      BluetoothSerial.write("================================\n");
      const ticketDatas= i.ticketData;
      let j,k;

      BluetoothSerial.write(buf);
      BluetoothSerial.write(bufFontSize);
      BluetoothSerial.write(bufAlign);
      for(k = 0 ;k < 3 ;k ++)
      {
          const text = " ";
          for( j = 0 ;j < 5 ;j++)
          {
              text=text + Math.floor(ticketDatas[k][j]/10) + (ticketDatas[k][j]%10)
              if(j!= 4)
                text=text + " "
          }
          BluetoothSerial.write(text+"\n");
      }
      BluetoothSerial.write(buf);
      BluetoothSerial.write("\n");
      BluetoothSerial.write("================================\n");
      BluetoothSerial.write("\n");
      BluetoothSerial.write("\n");
    })
  }
  shareTickets = () => {
    var base64_strings = [];
    /*
    let i;
    for ( i = 0 ; i < this.state.codes.length; i++)
    {
        const path = `${RNFS.DocumentDirectoryPath}/${i}.png`;
        await RNFS.downloadAsync({ fromUrl: "https://luckybingo.herokuapp.com/image?code="+this.state.codes[i], toFile: `file://${path}` })
        const res = await RNFS.readFile(`file://${path}`);
        base64_strings.push(res);
        RNFS.unlink(`file://${path}`);
    } 
    console.log(base64_strings[0] == base64_strings[1]);
    console.log(base64_strings[1]);
    */
   console.debug(this.state.codes.join(","));
   axios.post(apiConstants.baseurl + '/get_images',{codes:this.state.codes.join(",")})
    .then(res => {
      if(res.data.images) {
        base64_strings = res.data.images;
        console.log(base64_strings);
         let shareOptionsUrl = {
           title: 'BINGO DA STORE',
           message:"VD: "+this.state.seller+"\n"+"CL: "+this.state.client+"\n"+"NS: "+this.state.draw+"\n"+"DT: "+moment(this.state.drawDate.split(" ")[1],"YYYY-MM-DD").format("DD-MM-YYYY"),
           urls: base64_strings, // use image/jpeg instead of image/jpg\
           subject: 'Share information with whatsapp'
         };
         Share.open(shareOptionsUrl);
      }
    })
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <Wallpaper>
        <View style={styles.titleWrapper}>
            <Text style={styles.menuTitle}>1.NOVA VENDA</Text>
        </View>
        
        <View style={[styles.Wrapper,{marginTop:20}]}>
            <Text style={styles.textGreenBack}>SORTEIO</Text>
            <Text style={styles.textYellowBackBorder}>{this.state.drawDate.split(" ")[0] + " " + moment(this.state.drawDate.split(" ")[1],"YYYY-MM-DD").format("DD-MM-YYYY")}</Text>
        </View>

        <View style={[styles.Wrapper,{marginTop:3}]}>
            <Text style={styles.textGreyBack}>QTD DE CARTELAS</Text>
            <Text style={styles.textYellowBackBorder}>{this.state.ticketCount}</Text>
        </View>
        <View style={[styles.Wrapper,{marginTop:3}]}>
            <Text style={styles.textGreyBack}>VALOR</Text>
            <Text style={styles.textYellowBackBorder}>${this.state.ticketCount * this.state.ticketValue}</Text>
        </View>
        <View style={styles.safeView}>
          <ScrollView style={styles.cardWrapper}>
          {
            this.state.ticketData.map((element,index) => {
              return (
                <Card key={index} ticketData = {element.ticketData} ticketID = {element.ticketID} seller={element.seller}/>
              );
            })
          }
          </ScrollView>
        </View>

        <View style={styles.nameWrapper}>
          <Text style={styles.nameLabel}>NOME</Text>
          <TextInput style={styles.nameText} value={this.state.client} onChangeText={(value)=>this.setState({client: value})}></TextInput>
        </View>
        <MenuItem backgroundColor="#29942e" text="CONFIRMAR" fontSize={25} marginTop={20} onPress={()=>this.confirmTicket()}/>
        <MenuItem backgroundColor="#d21d00" text="VOLTAR" fontSize={25} marginTop={10} onPress={()=>Actions.pop()}/>
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                activeOpacity={0.5} onPress={()=>this.printTickets()}>
                <Image
                  source={printImg}
                  style={styles.buttonImageIconStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5} onPress={()=>this.shareTickets()}>
                <Image
                  source={shareImg}
                  style={styles.buttonImageIconStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5} onPress={()=>{
                  Actions.push('menuScreen')
                  this.setState({modalVisible: false})  
                }}>
                <Image
                  source={backImg}
                  style={styles.buttonImageIconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </View>
        {modalVisible?<View style={styles.overlay} />:<></>}
      </Wallpaper>
    );
  }
}
const mapStateToProps = state => ({
  drawNo: state.auth.draw,
  seller: state.auth.userData.username
});

export default connect(mapStateToProps)(NewsaleScreen2);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  titleWrapper: {
      backgroundColor: "#2a2c7750",
      alignItems: "center",
      marginTop: 50,
      paddingTop: 15,
      paddingBottom: 15
  },
  menuTitle: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#29942e',
      width: DEVICE_WIDTH - 60
  },
  Wrapper: {
      flexDirection: "row",
      marginLeft: 20
  },
  textGreenBack: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#29942e',
      width: 120,
      height: 30
  },
  textYellowBackBorder: {
      color: 'black',
      fontSize: 20,
      height: 30,
      fontWeight: "bold",
      textAlign: 'center',
      backgroundColor: 'yellow',
      borderColor: 'black',
      borderWidth: 1,
      paddingLeft: 15,
      paddingRight: 15
  },
  
  textGreyBack: {
      color: 'white',
      fontSize: 20,
      height: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#6f6f6f',
      width: 250,
      marginRight: 3
  },
  cardWrapper: {
    marginTop: 30,
    backgroundColor: 'pink',
    marginHorizontal: 20,
    paddingBottom: 50
  },
  safeView : {
    height: 300,
  },
  nameWrapper: {
    flexDirection: 'row',
    marginTop: 30,
    width: DEVICE_WIDTH - 60,
    marginLeft: 30
  },
  nameLabel: {
      fontSize: 25,
      color: 'white',
      backgroundColor:  '#29942e',
      fontWeight: 'bold',
      borderWidth: 1,
      borderColor: '#333',
      width: 150,
      textAlign: 'center',
      height: 40
  },
  nameText: {
    backgroundColor: 'rgb(255, 255, 255)',
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 30,
    width: DEVICE_WIDTH - 240,
    height: 40
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
    flexDirection: "row"
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 15,
    height: 45,
    width: 45,
    resizeMode: 'stretch',
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
