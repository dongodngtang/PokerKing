/**
 *作者：lorne
 *时间：2018/12/5
 *功能：
 */

import React, {Component} from 'react';
import {Router} from 'react-native-router-flux';
import {scenes} from './pages'
import RouterO from './configs/Router';


export default class Root extends Component {
    constructor(props) {
        super(props);
        this.router = this.router || new RouterO();
        global.router = this.router;

    }

    render() {
        return (
            <Router>
                {scenes()}
            </Router>


        )
    }
}


