/**
 *作者：lorne
 *时间：2018/12/5
 *功能：
 */

import React, {Component} from 'react';
import {Platform,BackHandler} from 'react-native'
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

let lastBackTime = 0

@connect(({ common}) => ({
      ...common
}))
export default class Root extends Component {
    constructor(props) {
        super(props);
        this.router = this.router || new RouterO();
        global.router = this.router;

        this.lang = this.lang || new Language()
        global.lang = this.lang

        initBaseUrl()

    }

    componentDidMount() {
        SplashScreen.hide();
        if(Platform.OS ==='ios'){
            JShareModule.setup()
        }

        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
        }
    }

    onBackAndroid =()=> {


        if (Actions.state.index > 0) {
            router.pop()
            return true
        } else {
            logMsg('款式大方',Actions.state)
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {//按第二次的时候，记录的时间+2000 >= 当前时间就可以退出
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp();//退出整个应用
                return false
            }
            this.lastBackPressed = Date.now();//按第一次的时候，记录时间
            showToast('再按一次退出应用');//显示提示信息
            return true;

        }
    }

    render() {
        return (
            <Router>
                {scenes()}
            </Router>


        )
    }
}


