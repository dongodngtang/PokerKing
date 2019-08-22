/**
 *作者：lorne
 *时间：2019/8/12
 *功能：
 */

import React, {Component} from "react";
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import {isLogin, logMsg, showToast} from "../../utils/utils";
import {Images, px2dp} from "../../configs/Theme";
import {postCancelCollect, postCollect} from "../../services/accountDao";
import _ from 'lodash'
import dva from '../../utils/dva'

let collectInfos = new Set()
let collectEvents = new Set()

export const initCollects = (collects) => {
    collectInfos.clear()
    collectEvents.clear()
    collects && collects.forEach(item => {
        if (item.target_type === 'info') {
            collectInfos.add(item.info.id)
        } else if (item.target_type === 'main_event') {
            collectEvents.add(item.main_event.id)
        }
    })
    dva.getDispatch()({type: 'MinePage/setCollections', params: collects})

}

export default class CollectBtn extends Component {

    state = {
        show_collect: false
    }

    select = (state) => {
        return state.MinePage.collects
    }

    handleChange = () => {
        let collects = this.select(dva.getStore().getState())
        this.refresh()
    }

    refresh = ()=>{
        const {item, type} = this.props
        let show_collect = false
        if (type === 'info') {
            show_collect = collectInfos.has(item.id)
        } else if (type === 'main_event') {
            show_collect = collectEvents.has(item.id)
        }
        this.setState({
            show_collect
        })
    }

    componentDidMount() {
        this.refresh()
        dva.getStore().subscribe(this.handleChange)
    }

    render() {
        const {item, type, btnStyle} = this.props
        return <TouchableOpacity onPress={() => {
            if (isLogin()) {
                let body = {target_id: item.id, target_type: type}
                if (this.state.show_collect) {
                    postCancelCollect(body, data => {
                        showToast(global.lang.t("cancelFavorite"))
                        this.setState({
                            show_collect: false
                        })
                    }, err => {
                        showToast(global.lang.t('err_problem'))
                    })
                } else {
                    postCollect(body, data => {
                        showToast(global.lang.t("getFavorite"))
                        this.setState({
                            show_collect: true
                        })
                    }, err => {
                        showToast(global.lang.t('err_problem'))
                    })
                }

            } else {
                router.toLogin()
            }
        }}>
            {this.props.collect_gray ? <Image style={btnStyle}
                                              source={this.state.show_collect ? Images.collected_gray : Images.collection_gray}/> :
                <Image style={btnStyle}
                       source={this.state.show_collect ? Images.collected : Images.collect}/>}
        </TouchableOpacity>
    }

}