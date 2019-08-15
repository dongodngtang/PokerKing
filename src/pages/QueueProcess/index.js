import React, {Component} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getLoginUser, isEmptyObject, isStrNull, logMsg, moneyFormat} from "../../utils/utils";
import styles from './index.style';
import {Metrics, Images, px2dp} from "../../configs/Theme";
import {getCashQueues, getCashQueuesNumber} from '../../services/cashTableDao'
import NotData from '../comm/NotData';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {initLoginUser, shortUrl} from "../../services/accountDao";
import QRCodeModal from "./QRCodeModal";
import PopAction from "../comm/PopAction";

@connect(({QueueProcess}) => ({
    ...QueueProcess,
}))
export default class QueueProcess extends Component {


    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: props.params.item.name,
            onRight: () => {
                router.toFeedback(props.params.item.id);
            }
        })

        this.state = {
            signedList: []
        }
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
        const {id, small_blind, big_blind, table_numbers, cash_queue_members_count, buy_in, apply_index} = item;

        return (
            <View style={styles.item_view}>
                <View style={styles.left_view}>
                    <View style={styles.left_top_view}>
                        <Text style={styles.blind}>{`${small_blind}/${big_blind} NLH`}</Text>
                        <Text style={styles.hkd}>{`${buy_in}`}</Text>
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
                            style={[styles.ranking_info, !isStrNull(apply_index) ? styles.ranking_info3 : styles.ranking_info2]}>{apply_index ? apply_index : '--'}
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.right_mid_view, {backgroundColor: isStrNull(apply_index) ? '#1A1B1F' : "#303236"}]}
                        onPress={() => {
                            if (isStrNull(apply_index)) {
                                this.PopAction && this.PopAction.toggle()
                            }

                        }}>
                        <Text
                            style={styles.application_wait}>{isStrNull(apply_index) ? global.lang.t('application_wait') : global.lang.t('cancel_wait')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    signChange = (item, i) => {
        let changeList = [...this.state.signedList]
        changeList[i].signed = !item.signed
        this.setState({
            signedList: changeList
        })
    }

    toSign = () => {
        const {signedList} = this.state
        let ids = []
        signedList.forEach((x, i) => {
            if (x.signed) {
                ids.push(x.id)
            }
        })
        let str = ids.join("|")
        logMsg('报名', str)
        let cash_game_id = this.props.params.item.id
        let access_token = getLoginUser().access_token
        let url = `http://www.baidu.com?token=${access_token}&cash_queue_id=${str}&cash_game_id=${cash_game_id}`

        shortUrl({url}, data => {
            this.QRCodeModel && this.QRCodeModel.toggle(data.short_url)
        })
    }

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

                <PopAction
                    ref={ref => this.PopAction = ref}>
                    <ChooseType
                        cancel={() => {
                            this.PopAction && this.PopAction.toggle()
                        }}
                        confirm={this.toSign}
                        onChange={this.signChange}
                        signedList={this.state.signedList}/>
                </PopAction>
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

                    if (data && data.queues) {
                        let members = data.queues;
                        let signedList = []
                        members.forEach(x => {
                            signedList.push({
                                buy_in: x.buy_in,
                                signed: !isStrNull(x.apply_index),
                                id: x.id
                            })
                        })
                        this.setState({
                            signedList
                        })

                        startFetch(data.queues, 18)
                    } else {
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


const ChooseType = ({signedList, onChange, cancel, confirm}) => {
    let count = signedList.length - 1
    return <View style={{backgroundColor: '#fff'}}>
        <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            height: px2dp(100), width: '100%'
        }}>
            <TouchableOpacity
                onPress={() => {
                    cancel && cancel()
                }}
                style={{height: px2dp(100), width: px2dp(140), alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, color: '#303236'}}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    cancel && cancel();
                    confirm && confirm()
                }}
                style={{height: px2dp(100), width: px2dp(140), alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, color: '#303236'}}>确定</Text>
            </TouchableOpacity>
        </View>

        {signedList && signedList.map((item, i) => <View
            key={`we${i}`}
            style={{width: '100%'}}>
            <TouchableOpacity
                onPress={() => onChange && onChange(item, i)}
                style={{height: px2dp(72), flexDirection: 'row', alignItems: 'center'}}>

                <View style={{width: px2dp(194)}}/>
                <Image style={{height: px2dp(44), width: px2dp(44)}}
                       source={item.signed ? Images.selected : Images.select_gary}/>
                <Text style={{fontSize: 16, color: '#303236', marginLeft: px2dp(48)}}>{item.buy_in}</Text>
            </TouchableOpacity>
            {i < count ?
                <View style={{height: px2dp(2), backgroundColor: '#DCDCDC', marginHorizontal: px2dp(38)}}/> : null}

        </View>)}


        <Text style={{fontSize: 12, color: '#888888', marginTop: px2dp(30), marginLeft: px2dp(34)}}
        >提示：我们将会在等候人数最后5位、10位时，向您发送推送提醒</Text>
        <View style={{height: px2dp(100)}}/>
    </View>
}
