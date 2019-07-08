import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {getCollectionList, initLoginUser} from "../../services/accountDao";
import {logMsg} from "../../utils/utils";
import {Metrics} from "../../configs/Theme";
import HotItem from "../Home/HotItem";
import NotData from "../comm/NotData";

@connect(({Collections}) => ({
    ...Collections,
}))
export default class Collections extends Component {


    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#1A1B1F"}}>
                <UltimateFlatList
                    ref={(ref) => this.listView = ref}
                    onFetch={this.onFetch}
                    separator={this._separator}
                    keyExtractor={(item, index) => `hot_race${index}`}
                    item={this._renderItem}
                    refreshableTitlePull={global.lang.t('pull_refresh')}
                    refreshableTitleRelease={global.lang.t('release_refresh')}
                    dateTitle={global.lang.t('last_refresh')}
                    allLoadedText={global.lang.t('no_more')}
                    waitingSpinnerText={global.lang.t('loading')}
                    emptyView={() => <NotData/>}
                />
            </View>
        )
    }

    _separator = () => {
        return (
            <View style={{
                height: 1,
                backgroundColor: "#303236",
                width: Metrics.screenWidth,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View
                    style={{
                        height: 1,
                        backgroundColor: "#998E72",
                        width: Metrics.screenWidth - 34,
                        alignSelf: 'center'
                    }}/>
            </View>
        )
    }

    _renderItem = (item, index) => {

        return (
            <View style={{backgroundColor: '#303236'}}>
                <HotItem item={item} type={item.target_type}/>
            </View>
        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            initLoginUser(() => {

                getCollectionList({
                    page,
                    page_size: 20
                }, data => {
                    logMsg("CollectionList:", data)
                    startFetch(data.items, 20)
                }, err => {
                    logMsg("reject:", err)
                    abortFetch()
                })
            })

        } catch (err) {
            abortFetch();
        }
    };
}
