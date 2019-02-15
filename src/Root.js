/**
 *作者：lorne
 *时间：2018/12/5
 *功能：
 */

import React, {Component} from 'react';
import {Router} from 'react-native-router-flux';
import {scenes} from './pages'
import RouterO from './configs/Router';
import Language from './lang/Language'
import {connect} from 'react-redux';
import './configs/StorageConfig'
import {initBaseUrl} from "./configs/fetch";

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

    render() {
        return (
            <Router>
                {scenes()}
            </Router>


        )
    }
}


