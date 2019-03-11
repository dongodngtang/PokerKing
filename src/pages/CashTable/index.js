import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground,FlatList} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images} from "../../configs/Theme";
import {getCashGames, getCashQueuesNumber} from "../../services/cashTableDao";
import {getBg, isEmpty, isEmptyObject, logMsg} from "../../utils/utils";
import {Metrics} from "../../configs/Theme";
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import NotData from "../comm/NotData";
import {initLoginUser} from "../../services/accountDao";

@connect(({CashTable}) => ({
    ...CashTable,
}))
export default class CashTable extends Component {

    _separator=()=>{
        return (
            <View style={{height:4,width:Metrics.screenWidth}}/>
        )
    };

    _renderItem=(item,index)=>{
        return(
            <TouchableOpacity key={index} activeOpacity={1} onPress={() => {
                router.toQueueProcess(item)
            }}>
                <ImageBackground source={getBg(item.image)} style={[styles.jinsha, {
                    flexDirection: "row-reverse",
                    alignItems: 'center'
                }]}>
                    {/*<View style={styles.txt_view}>*/}
                        {/*<Text style={styles.txt1}>{global.lang.t('sands_casino')}</Text>*/}
                        {/*<Text style={styles.txt2}>{global.lang.t('queuing')}></Text>*/}
                    {/*</View>*/}
                </ImageBackground>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={styles.table_view}>

                <UltimateFlatList
                    firstLoader={true}
                    ref={(ref) => this.listView = ref}
                    onFetch={this.onFetch}
                    separator={this._separator}
                    keyExtractor={(item, index) => `cashTable${index}`}
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
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            initLoginUser(() => {
                getCashGames({
                    page,
                    page_size: 20
                }, data => {
                    logMsg("cash_games:", data);
                    startFetch(data.data.items, 18)
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
