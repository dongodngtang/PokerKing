import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './index.style';

@connect(({CashTable}) => ({
  ...CashTable,
}))
export default class CashTable extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <View>
        <Text>CashTable</Text>
      </View>
    )
  }
}
