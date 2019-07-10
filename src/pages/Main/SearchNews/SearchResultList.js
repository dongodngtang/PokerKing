/**
 *作者：lorne
 *时间：2019/7/9
 *功能：
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import UltimateFlatList from '../../../components/ultimate/UltimateFlatList';
import {ImageLoad} from '../../../components'
import {px2dp, px2sp, wh} from "../../../configs/Theme";
import {isEmpty, logMsg, utcDate} from "../../../utils/utils";
import {infosSearch} from "../../../services/raceDao";
import NotData from "../../comm/NotData";

export default class SearchResultList extends Component {

    search = (params) => {
        this.searchParams = params
        this.list && this.list.refresh()
    }

    render() {
        return <View style={styles.container}>
            <UltimateFlatList
                ref={ref => this.list = ref}
                firstLoader={false}
                onFetch={this.onFetch}
                separator={() => <View style={styles.line}/>}
                keyExtractor={(item, index) => `search${index}`}
                item={this._renderItem}
                paginationFetchingView={()=><View/>}
                emptyView={() => <NotData/>}
            />
        </View>
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            if (this.searchParams) {
                infosSearch({page,...this.searchParams}, data => {
                    startFetch(data.infos, 18)
                })
            } else {
                abortFetch()
            }
        } catch (e) {
            abortFetch()
        }

    }

    _renderItem = (item, index) => {
        const {image, title, source, created_at} = item
        let date = utcDate(created_at, 'MM-DD')
        return <View style={styles.item}
                     key={`search_result_item${index}`}>
            {isEmpty(image)?<View style={styles.banner}/>:<ImageLoad style={styles.banner}
                                               source={{uri: image}}/>}

            <View style={{height: px2dp(150),marginLeft:px2dp(22)}}>
                <Text style={styles.title}>{title}</Text>
                <View style={{flex: 1}}/>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.source}>{source}</Text>
                    <Text style={[styles.source, {marginLeft: px2dp(20)}]}>{date}</Text>
                </View>
            </View>
        </View>

    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303236',
        flex:1
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(220),
        paddingHorizontal: px2dp(34)
    },
    banner: {
        ...wh(258, 150)
    },
    title: {
        fontSize: px2sp(32),
        color: '#FFE9AD',
        width: px2dp(400)
    },
    source: {
        fontSize: px2sp(24),
        color: '#998E72'
    },
    line: {
        backgroundColor: '#998E72',
        height: px2dp(2),
        marginHorizontal: px2dp(34)
    }
})