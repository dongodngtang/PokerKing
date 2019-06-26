import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import Base from "../Base";
import NavigationBar from "../comm/NavigationBar";


@connect(({Main}) => ({
  ...Main,
}))
export default class Main extends Component {
  

  componentDidMount(){

  }

  render() {
    return (
      <Base>
        <NavigationBar/>

      </Base>
    )
  }
}
