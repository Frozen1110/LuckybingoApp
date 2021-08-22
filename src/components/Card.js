import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import {StyleSheet, View, TextInput, ImageBackground, Text, Button,TouchableHighlight} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: this.props.ticketData,
      ID: this.props.ticketID,
      VD: this.props.seller,
    }
  }
  render() {
    return (
        <View style={styles.Wrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: 'black'}} style={{flexDirection:"row"}}>
                <TableWrapper style={{width: 50}} borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                    <Cell data={"ID:"+this.state.ID+"\n"+"VD:"+this.state.VD+"\n"+"\n"+"\n"} textStyle={styles.rotateText}/>
                </TableWrapper>
                <TableWrapper style={{flex: 1}}>
                    <Rows data={this.state.tableData} textStyle={styles.TableText}/>
                </TableWrapper>
            </Table>
        </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    Wrapper: {
        backgroundColor : 'yellow',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
    },
    TableText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 25
    },
    rotateText: {
        color: 'black',
        fontSize: 15,
        transform: [{ rotate: '-90deg'}],
        textAlign: 'left',
        width:100
    }
});
