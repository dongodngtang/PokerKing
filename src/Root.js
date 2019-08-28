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
import codePush from "react-native-code-push";
import {initLoginUser} from "./services/accountDao";
import JPushModule from 'jpush-react-native'

@connect(({ common}) => ({
      ...common
}))
@codePush
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


        initLoginUser(()=>{
            SplashScreen.hide();
        })

        if(Platform.OS ==='ios'){
            JShareModule.setup()
            JPushModule.hasPermission(ret=>{
                if(ret){
                    JPushModule.initPush()
                }

            })
        }else{
            JPushModule.initPush()
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
        }


        codePush.disallowRestart()
        codePush.sync({
            updateDialog: false,
            installMode: codePush.InstallMode.ON_NEXT_RESUME
        })

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


