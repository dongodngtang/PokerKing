import React, { Component } from 'react';
import { View,Text,Button} from 'react-native';
import { connect } from 'react-redux';
import {logMsg} from "../../utils/utils";


@connect(({Home,common}) => ({
  ...Home,
    ...common
}))
export default class Home extends Component {
  

  componentDidMount(){
    const {dispatch} = this.props
      dispatch({type:'Home/effectsDemo'})
  }

  render() {

    return (
      <View>
        <Text>{global.lang.t('app_name')}</Text>

          <Button
              onPress={()=>{
                // router.toDetail()
                  global.lang.switchLang('en')
              }}
              title={'切换英文'}/>
          <Button
              onPress={()=>{
                  // router.toDetail()
                  global.lang.switchLang('zh')
              }}
              title={'切换中文'}/>

          <Button
              onPress={()=>{
                  router.toLogin()
              }}
              title={'跳转到登录'}/>
      </View>
    )
  }
}
