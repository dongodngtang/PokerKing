import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';
import {logMsg} from "../../utils/utils";
import styles from './index.style'

@connect(({QueueProcess}) => ({
  ...QueueProcess,
}))
export default class QueueProcess extends Component {

    constructor(props) {
        super(props);
        props.navigation.setParams({
            title:`${global.lang.t(this.props.params.type)}${global.lang.t('queue_process')}`
        })
    }
  

  componentDidMount(){

  }

  render() {
    return (
      <View style={styles.process_view}>
        <Text>QueueProcess</Text>
      </View>
    )
  }
}
