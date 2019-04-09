import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {isEmptyObject, logMsg} from "../../utils/utils";
import styles from './index.style';
import {Metrics, Images} from "../../configs/Theme";
import {getCashQueues, getCashQueuesNumber} from '../../services/cashTableDao'
import NotData from '../comm/NotData';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {initLoginUser} from "../../services/accountDao";

@connect(({QueueProcess}) => ({
    ...QueueProcess,
}))
export default class QueueProcess extends Component {

    state = {
        cash_queues: []
    }

    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: `${global.lang.t('queue_process')}`
        })
    }


    _onRefresh = () => {
        this.listView && this.listView.refresh()
    };

    _renderItem = (item, index) => {
        const {cash_game_id, small_blind, big_blind, table_numbers, cash_queue_members_count, created_at} = item;
        const {cash_queues} = this.state;
        return (
            <TouchableOpacity style={item.isSelect ? styles.selected_item : styles.item_view} onPress={() => {
                cash_queues.forEach((x) => {
                    x.isSelect = item.id === x.id
                });
                this.setState({
                    cash_queues: [...cash_queues]
                });
                router.toQueueList(item);
            }}>
                <Text
                    style={[styles.item_txt,{width:'56%'}]}>{`${small_blind}/${big_blind}NL（${table_numbers}${global.lang.t('table')}）`}</Text>
                <View style={{flex: 1}}/>
                <Text
                    style={[styles.item_txt, {marginRight: 20}]}>{global.lang.t('line_count')}：{cash_queue_members_count}</Text>
                <Image style={{height: 12, width: 6}} source={Images.is_right}/>
            </TouchableOpacity>
        )
    };


    render() {
        return (
            <View style={styles.process_view}>
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
                    let members = data.ordinary_queues;
                    let high_limit = data.high_limit_queues;
                    if (!isEmptyObject(high_limit) && high_limit.status) {
                        members.push(data.high_limit_queues);
                    }
                    members.map((item, index) => {
                        item.isSelect = index === 0;
                    });
                    this.setState({
                        cash_queues: members
                    })
                    startFetch(members, 18)
                    logMsg("djskjdksd",members)
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
            <View style={{height: 1, width: Metrics.screenWidth, backgroundColor: "#2D2D2D"}}/>
        )
    }
}
