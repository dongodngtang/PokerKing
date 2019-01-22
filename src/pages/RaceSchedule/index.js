import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './index.style';

@connect(({RaceSchedule}) => ({
  ...RaceSchedule,
}))
export default class RaceSchedule extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <View>
        <Text>RaceSchedule</Text>
      </View>
    )
  }
}
