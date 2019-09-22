/**
 *作者：lorne
 *时间：2018/12/5
 *功能：
 */

import React, {Component} from 'react';
import {Platform, BackHandler, NetInfo} from 'react-native'
import {Router} from 'react-native-router-flux';
import {scenes} from './pages'
import RouterO from './configs/Router';
import Language from './lang/Language'
import {connect} from 'react-redux';
import './configs/StorageConfig'
import {initBaseUrl} from "./configs/fetch";
import SplashScreen from 'react-native-splash-screen'
import JShareModule from 'jshare-react-native';
import {logMsg, showToast} from "./utils/utils";
import {Actions} from 'react-native-router-flux';
import codePush from "react-native-code-push";
import {initLoginUser} from "./services/accountDao";
import JPushModule from 'jpush-react-native'

@connect(({common}) => ({
  ...common
}))
@codePush
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.router = this.router || new RouterO();
    global.router = this.router;
    initBaseUrl()
    this.lang = this.lang || new Language()
    global.lang = this.lang
  }

  componentWillMount() {
    //第一次获取
    NetInfo.isConnected.fetch().done((status) => {
      console.log('Status:' + status);
      this.handleConnectivityChange(status)
    });

    //监听网络状态改变
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

  }

  handleConnectivityChange=(isConnected)=> {
    console.log('status change:' + isConnected);
    //监听第一次改变后, 可以取消监听.或者在componentUnmount中取消监听
    // NetInfo.removeEventListener('change', this.handleConnectivityChange);
    if(!isConnected){

      alert('请在设置中允许App使用网络或检查手机网络是否打开')
    }

  }


  componentDidMount() {
    initLoginUser(() => {
      SplashScreen.hide();
    })

    if (Platform.OS === 'ios') {
      JShareModule.setup()
      JPushModule.hasPermission(ret => {
        if (ret) {
          JPushModule.initPush()
        }

      })
    } else {
      JPushModule.initPush()
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }


    codePush.disallowRestart()
    codePush.sync({
      updateDialog: false,
      installMode: codePush.InstallMode.ON_NEXT_RESUME
    })
  }

  onBackAndroid = () => {


    if (Actions.state.index > 0) {
      router.pop()
      return true
    } else {
      logMsg('款式大方', Actions.state)
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {//按第二次的时候，记录的时间+2000 >= 当前时间就可以退出
        //最近2秒内按过back键，可以退出应用。
        BackHandler.exitApp();//退出整个应用
        return false
      }
      this.lastBackPressed = Date.now();//按第一次的时候，记录时间
      showToast(global.lang.t("again_exit"));//显示提示信息
      return true;

    }
  }

  componentWillUnmount() {
    console.log("componentWillUnMount");
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }




  render() {
    return (
      <Router>
        {scenes()}
      </Router>


    )
  }
}


