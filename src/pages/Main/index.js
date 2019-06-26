import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import Base from "../Base";
import NavigationBar from "../comm/NavigationBar";
import ScrollableTab from 'react-native-scrollable-tab-view'
import {getInfoList} from "../../services/accountDao";
import {logMsg} from "../../utils/utils";
import Hot from "./Hot";


@connect(({Main}) => ({
    ...Main,
}))
export default class Main extends Component {


    componentDidMount() {

    }

    onFetch = (page = 1, startFetch, abortFetch)=>{
        getInfoList({
            status: 'hot',
            page,
            page_size: 20
        }, data => {
            logMsg("InfoList:", data)
            startFetch(data.infos, 20)
        }, err => {
            logMsg("reject:", err)
            abortFetch()
        })
    }

    render() {
        return (
            <Base>
                <NavigationBar/>
                <Hot onFetch={this.onFetch}/>

            </Base>
        )
    }
}
