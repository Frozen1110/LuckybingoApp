import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import {StyleSheet, View, TextInput, ImageBackground, Text, Button,TouchableHighlight} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default class SoldCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  handleCancel = () => {
    this.props.onCancel(this.props.ticketID);
  }
  handleShare = () => {
    this.props.onShare(this.props.message,this.props.code);
  }
  handlePrint = () => {
    this.props.onPrint(this.props.ticketID,this.props.client,this.props.seller,this.props.drawNo,this.props.ticketDate,this.props.ticketData);
  }
  render() {
    return (
        <View style={styles.Wrapper}>
          <View style={{flexDirection: 'row', width: DEVICE_WIDTH - 80, alignItems: 'center'}}>
            <Text style={{borderWidth: 1, borderColor: 'black',height: 30,flex:0.3,textAlign:'center',backgroundColor:'white',color:'black'}}>{this.props.drawNo}</Text>
            <Text style={{borderWidth: 1, borderColor: 'black',height: 30,flex:0.7,textAlign:'center',backgroundColor:'white',color:'black'}}>{this.props.ticketID}</Text>
          </View>
          <View style={{flexDirection: 'row', width: DEVICE_WIDTH - 120, justifyContent: 'space-between',marginTop: 3}}>
            <TouchableHighlight onPress={this.handlePrint}>
              <Text style={{backgroundColor:'#29942e' ,fontSize: 15, width:100, height: 30, color: 'white', fontWeight:'bold',textAlign:'center'}}>IMPRIMIR</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.handleShare}>
              <Text style={{backgroundColor:'#d21d00' ,fontSize: 15, width:100, height: 30, color: 'white', fontWeight:'bold',textAlign:'center'}}>COMPAT</Text>
            </TouchableHighlight>
            {
              this.props.cancelled == false?
                <TouchableHighlight onPress={this.handleCancel}>
                  <Text style={{backgroundColor:'#163988' ,fontSize: 15, width:100, height: 30, color: 'white', fontWeight:'bold',textAlign:'center'}}>CANCEL</Text>
                </TouchableHighlight>
                :<Text style={{ width:100, height: 30}}></Text>
            }
          </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  Wrapper: {
    alignItems: 'center',
    marginTop: 10
  }
});
