import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, px2dp} from "../../configs/Theme";
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


    topBar = () => {
        return (
            <View style={styles.navTop}>
                <StatusBar barStyle={'light-content'}/>
                <View
                    onPress={() => {

                    }}
                    style={styles.left2}>
                    {/*<Image*/}
                        {/*style={{height: px2dp(48), width: px2dp(120)}}*/}
                        {/*source={Images.puke_icon}*/}
                    {/*/>*/}

                </View>
                <View
                    style={styles.navTitle}>
                    <Text
                        style={{fontSize: 17, color: '#FFE9AD'}}
                        numberOfLines={1}>{global.lang.t('room')}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        router.toSetting();
                    }}
                    style={styles.right2}>
                    <Image
                        style={{height: px2dp(38), width: px2dp(36)}}
                        source={Images.setting}
                    />

                </TouchableOpacity>
            </View>
        )
    };

    _separator = () => {
        return (
            <View style={{height: 4, width: Metrics.screenWidth}}/>
        )
    };

    getLang=(item)=>{
        const {image_complex,image_en, image} = item;
        let lang = global.localLanguage;
        if(lang === 'en'){
            return image_en
        }else if(lang === 'zh-e'){
            return image_complex
        }else {
            return image
        }
    };

    _renderItem = (item, index) => {
        let img = this.getLang(item);
        return (
            <TouchableOpacity key={index} activeOpacity={1} onPress={() => {
                router.toQueueProcess(item)
            }}>
                <ImageBackground source={getBg(img)} style={[styles.jinsha, {
                    flexDirection: "column-reverse"
                }]}>
                    <TouchableOpacity activeOpacity={1}  style={[styles.txt_view,{backgroundColor:'#101010',opacity:0.78}]}>
                        <Text style={styles.txt1} numberOfLines={1}>{item.name}</Text>
                        <View style={{flex:1}}/>
                        <Image
                            style={{height: px2dp(48), width: px2dp(40),marginRight:17}}
                            source={Images.location}
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={styles.table_view}>
                {this.topBar()}
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
