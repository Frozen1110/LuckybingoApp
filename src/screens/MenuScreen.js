import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  BackHandler,
  Alert
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import arrowImg from '../images/left-arrow.png';

import Wallpaper from '../components/Wallpaper';
import Title from '../components/Title';
import TimeCount from '../components/TimeCount';
import Menu from '../components/Menu';
import axios from 'axios';
import {apiConstants} from '../constants/api';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

//import Menu from '../components/Menu';
const SIZE = 40;

class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      remainSecond: 0,
      drawNo: this.props.drawNo,
      drawDate: '',
      seller: this.props.seller
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }
  componentDidMount() {
    axios.get(apiConstants.baseurl + '/get_remaintime?zero=0')
    .then(res => {
      if(res.data.second) {
        if(res.data.second < 0) {
          res.data.second = 0;
        }
        this.setState({remainSecond:parseInt(res.data.second),drawNo:res.data.drawNo,drawDate:res.data.drawDate});
        if(this.timer == 0 && res.data.second > 0 ) {
          this.timer = setInterval(this.countDown, 1000);
          Toast.show('Next draw number is ' + this.state.drawNo, Toast.LONG);
        }
      }
      if(res.data.message) {
        Toast.show(res.data.message,Toast.LONG);
        this.setState({remainSecond:0,drawNo:-1,drawDate:""});
      }
    }) 
  }
  countDown() {
    // Remove one second, set state so a re-render happens.
    let remainSecond = this.state.remainSecond - 1;
    this.setState({
      remainSecond: remainSecond,
    });
    
    // Check if we're at zero.
    if (remainSecond == 0) { 
      clearInterval(this.timer);
      axios.post(apiConstants.baseurl + '/processing_draw',{drawNo: this.state.drawNo})
      .then(res => {
        if(res.data.result == 'success') {
          Toast.show('Draw No '+this.state.drawNo +" started",Toast.LONG);
        }
        axios.get(apiConstants.baseurl + '/get_remaintime?zero=0')
        .then(res => {
          if(res.data.drawNo != -1) {
            this.setState({remainSecond:parseInt(res.data.second),drawNo:res.data.drawNo,drawDate:res.data.drawDate});
            if(res.data.second > 0 ) {
              this.timer = setInterval(this.countDown, 1000);
              Toast.show('Next draw number is ' + this.state.drawNo, Toast.LONG);
            }
          } else {
            Toast.show(res.data.message,Toast.LONG);
            this.setState({remainSecond:0,drawNo:-1,drawDate:""});
          }
        })
      })
    }
  }

  render() {
    return (
      <Wallpaper>
        <Title backgroundColor="#2a2c7750" color="white" text="BEM VINDO, LOGIN"/>
        <View styles={styles.container}>
          <TimeCount second={this.state.remainSecond}/>
          <Menu drawNo={this.state.drawNo} drawDate={this.state.drawDate}/>
        </View>
      </Wallpaper>
    );
  }
}
const mapStateToProps = state => ({
  drawNo: state.auth.draw,
  seller: state.auth.userData.username
});

export default connect(mapStateToProps)(MenuScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
