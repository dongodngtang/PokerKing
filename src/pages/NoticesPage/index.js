import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import {Images} from "../../configs/Theme";
import TopBar from "../comm/TopBar";
import styles from './index.style'

@connect(({NoticesPage}) => ({
  ...NoticesPage,
}))
export default class NoticesPage extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#1A1B1F"}}>

        <Text>NoticesPage</Text>
      </View>
    )
  }
}
