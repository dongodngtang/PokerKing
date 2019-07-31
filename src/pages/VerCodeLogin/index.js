import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';


@connect(({VerCodeLogin}) => ({
  ...VerCodeLogin,
}))
export default class VerCodeLogin extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <View>
        <Text>VerCodeLogin</Text>
      </View>
    )
  }
}
