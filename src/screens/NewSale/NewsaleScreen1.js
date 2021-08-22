import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Dimensions } from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from 'moment'

import Wallpaper from '../../components/Wallpaper';
import DropDownPicker from 'react-native-dropdown-picker';
import ToggleCountButton from '../../components/ToggleCountButton';
import NumericInput from 'react-native-numeric-input';
import MenuItem from '../../components/MenuItem';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class NewsaleScreen1 extends Component {
  constructor() {
    super();
    this.state = {
        ticketCount: 1,
    };
  }
  render() {
    return (
      <Wallpaper>
        <View style={styles.titleWrapper}>
            <Text style={styles.menuTitle}>1.NOVA VENDA</Text>
        </View>
        <View style={styles.Wrapper}>
            <Text style={styles.textGreenBack}>SORTEIO</Text>
            <Text style={styles.textDate}>{this.props.drawDate.split(" ")[0] + " " + moment(this.props.drawDate.split(" ")[1],"YYYY-MM-DD").format("DD-MM-YYYY")}</Text>
        </View>
        
        <View style={styles.Wrapper}>
            <Text style={styles.textGreyBack}>QTD DE CARTELAS</Text>
            <DropDownPicker
                items={[
                    {label: '1', value: 1, hidden: true},
                    {label: '2', value: 2},
                    {label: '5', value: 5}, 
                    {label: '10', value: 10},
                ]}
                defaultValue={this.state.ticketCount!=1&&this.state.ticketCount!=2&&this.state.ticketCount!=5&&this.state.ticketCount!=10?null:this.state.ticketCount}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa',width: DEVICE_WIDTH - 60}}
                itemStyle={{
                    justifyContent: 'flex-start',
                    fontWeight: 'bold',
                    color: 'black'
                }}
                dropDownStyle={{backgroundColor: '#fafafa',width: DEVICE_WIDTH - 60}}
                onChangeItem={item => this.setState({
                    ticketCount: item.value
                })}
            />
            <View style={styles.buttonWrapper}>
                <ToggleCountButton onPress={()=>this.setState({ticketCount:1})} text="1" backgroundColor={this.state.ticketCount == 1? 'yellow' : 'white'}/>
                <ToggleCountButton onPress={()=>this.setState({ticketCount:2})} text="2" backgroundColor={this.state.ticketCount == 2? 'yellow' : 'white'}/>
                <ToggleCountButton onPress={()=>this.setState({ticketCount:5})} text="5" backgroundColor={this.state.ticketCount == 5? 'yellow' : 'white'}/>
                <ToggleCountButton onPress={()=>this.setState({ticketCount:10})} text="10" backgroundColor={this.state.ticketCount == 10? 'yellow' : 'white'}/>
            </View>
            <View style={styles.amountWrapper}>
                <Text style={styles.amountText}>QUANTIDADE</Text>
                <NumericInput inputStyle={styles.amountInput} initValue={this.state.ticketCount} minValue = {1} value={this.state.ticketCount} onChange={(value)=>this.setState({ticketCount: value})}></NumericInput>
            </View>
            <MenuItem backgroundColor="#29942e" text="AVANCAR" fontSize={30} marginTop={140} onPress={()=>Actions.newsaleScreen2({ticketCount: this.state.ticketCount,drawDate:this.props.drawDate})}/>
            <MenuItem backgroundColor="#d21d00" text="VOLTAR" fontSize={30} marginTop={30} onPress={()=>Actions.pop()}/>
        </View>
      </Wallpaper>
    );
  }
}

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
      marginTop: 20,
      alignItems: "center",
  },
  textGreenBack: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#29942e',
      width: DEVICE_WIDTH - 60
  },
  textDate: {
      color: 'black',
      marginTop: 5,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: 'center',
      backgroundColor: 'white',
      width: DEVICE_WIDTH - 60,
      borderColor: 'black',
      borderWidth: 1,
      paddingTop: 3,
      paddingBottom: 3,
  },
  textGreyBack: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#6f6f6f',
      width: DEVICE_WIDTH - 60
  },
  buttonWrapper: {
      width: DEVICE_WIDTH - 90,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10
  },
  amountWrapper: {
      flexDirection: 'row',
      width: DEVICE_WIDTH - 110,
      justifyContent: 'space-between',
      marginTop: 25
  },
  amountText: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
  },
  amountInput: {
    backgroundColor: 'rgb(255, 255, 255)',
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});