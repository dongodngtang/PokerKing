import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getLoginUser, isEmptyObject, logMsg, moneyFormat} from "../../utils/utils";
import styles from './index.style';
import {Metrics, Images} from "../../configs/Theme";
import {getCashQueues, getCashQueuesNumber} from '../../services/cashTableDao'
import NotData from '../comm/NotData';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {initLoginUser, shortUrl} from "../../services/accountDao";
import QRCodeModal from "./QRCodeModal";

@connect(({QueueProcess}) => ({
    ...QueueProcess,
}))
export default class QueueProcess extends Component {


    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: props.params.item.name,
            onRight: () => {
                this.listView && this.listView.refresh()
            }
        })
    };

    topName = () => {
        return (
            <View style={styles.topName_view}>
                <Text style={styles.room_waiting}>{global.lang.t('room_waiting')}</Text>
            </View>
        )
    }


    _onRefresh = () => {
        this.listView && this.listView.refresh()
    };

    _renderItem = (item, index) => {
        let rank = 12;
        const {id, small_blind, big_blind, table_numbers, cash_queue_members_count, buy_in} = item;

        return (
            <View style={styles.item_view}>
                <View style={styles.left_view}>
                    <View style={styles.left_top_view}>
                        <Text style={styles.blind}>{`${small_blind}/${big_blind} NLH`}</Text>
                        <Text style={styles.hkd}>{`HKD ${buy_in}`}</Text>
                    </View>
                    <View style={[styles.left_bottom_view, {marginTop: 4}]}>
                        <Text style={styles.table_numbers_text}>{`${global.lang.t('table_number')}`}</Text>
                        <Text style={styles.table_numbers_text}>{table_numbers}</Text>
                    </View>
                    <View style={[styles.left_bottom_view, {marginTop: 6}]}>
                        <Text style={styles.table_numbers_text}>{`${global.lang.t('waiting_number')}`}</Text>
                        <Text style={styles.table_numbers_text}>{cash_queue_members_count}</Text>
                    </View>
                </View>
                <View style={styles.right_view}>
                    <View style={styles.right_top_view}>
                        <Text style={styles.ranking}>{global.lang.t('ranking')}</Text>
                        <Text
                            style={[styles.ranking_info, rank > 0 ? styles.ranking_info3 : styles.ranking_info2]}>{rank > 0 ? rank : '--'}
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.right_mid_view, {backgroundColor: rank > 0 ? '#303236' : "#1A1B1F"}]}
                        onPress={() => {
                            let  cash_game_id = this.props.params.item.id
                            let access_token = getLoginUser().access_token
                            let url = `http://www.baidu.com?token=${access_token}&cash_queue_id=${id}&cash_game_id=${cash_game_id}`

                            shortUrl({url},data=>{
                                this.QRCodeModel && this.QRCodeModel.toggle(data.short_url)
                            })

                        }}>
                        <Text style={styles.application_wait}>{global.lang.t('application_wait')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };


    render() {
        return (
            <View style={styles.process_view}>
                {this.topName()}
                {this._separator()}
                <UltimateFlatList
                    firstLoader={true}
                    ref={(ref) => this.listView = ref}
                    onFetch={this.onFetch}
                    separator={this._separator}
                    keyExtractor={(item, index) => `hot_race${index}`}
                    item={this._renderItem}
                    refreshableTitlePull={global.lang.t('pull_refresh')}
                    refreshableTitleRelease={global.lang.t('release_refresh')}
                    dateTitle={global.lang.t('last_refresh')}
                    allLoadedText={''}
                    waitingSpinnerText={global.lang.t('loading')}
                    emptyView={() => <NotData/>}
                />

                <QRCodeModal
                    ref={ref => this.QRCodeModel = ref}/>
            </View>

        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {item} = this.props.params;
        try {
            initLoginUser(() => {
                getCashQueues({
                    page,
                    page_size: 20,
                    cash_game_id: item.id
                }, data => {
                    logMsg("cash_queues:", data);

                    if(data && data.queues){
                        let members = data.queues;
                        // let high_limit = data.high_limit_queues;
                        // if (!isEmptyObject(high_limit) && high_limit.status) {
                        //     members.push(data.high_limit_queues);
                        // }
                        if(!isEmptyObject(members)){
                            members.map((item, index) => {
                                item.isSelect = index === 0;
                            });
                        }


                        startFetch( members, 18)
                    }else{
                        abortFetch()
                    }

                }, err => {
                    logMsg("reject:", err)
                    abortFetch()
                })
            })

        } catch (err) {
            abortFetch();
        }
    };

    _separator = () => {
        return (
            <View style={{height: 9, width: Metrics.screenWidth, backgroundColor: "#1A1B1F"}}/>
        )
    }
}
