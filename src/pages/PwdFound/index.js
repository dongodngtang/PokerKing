import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';


@connect(({PwdFound}) => ({
  ...PwdFound,
}))
export default class PwdFound extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <View>
        <Text>PwdFound</Text>
      </View>
    )
  }
}
