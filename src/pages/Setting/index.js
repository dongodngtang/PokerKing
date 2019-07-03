import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';


@connect(({Setting}) => ({
  ...Setting,
}))
export default class Setting extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#1A1B1F"}}>

      </View>
    )
  }
}
