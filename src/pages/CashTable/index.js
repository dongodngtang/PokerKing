import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground, StatusBar, Platform} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, px2dp} from "../../configs/Theme";
import {getCashGames, postHotSwitch} from "../../services/cashTableDao";
import {getBg, isEmpty, isEmptyObject, isStrNull, logMsg, strNotNull, turn2MapMark} from "../../utils/utils";
import {Metrics} from "../../configs/Theme";
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import NotData from "../comm/NotData";
import {initLoginUser} from "../../services/accountDao";
import PopAction from "../comm/PopAction";


@connect(({CashTable}) => ({
    ...CashTable,
}))
export default class CashTable extends Component {

    state = {
        current_item: {},
        show_room: false
    }

    componentDidMount() {
        postHotSwitch(ret => {
            this.setState({
                show_room: true
            })
        }, err => {

        })
    }


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

    getLang = (item) => {
        const {image_complex, image_en, image} = item;
        let img = ''
        let lang = global.localLanguage;
        if (lang === 'en') {
            img = image_en
        } else if (lang === 'zh-e') {
            img = image_complex
        } else {
            img = image
        }
        if (isStrNull(img)) {
            return Images.empty_bg
        } else {
            return {uri: img}
        }
    };

    _renderItem = (item, index) => {
        let img = this.getLang(item);
        const {amap_location, amap_navigation_url, amap_poiid, location, name} = item;
        return (
            <TouchableOpacity key={index} activeOpacity={1} onPress={() => {
                if (this.state.show_room) {
                    router.toQueueProcess(item)
                } else {
                    this.setState({
                        current_item: item
                    })
                    if (Platform.OS === 'ios') {
                        this.popAction && this.popAction.toggle();
                    } else {
                        if (strNotNull(amap_navigation_url))
                            turn2MapMark(amap_location, amap_navigation_url, amap_poiid, location, name, '')

                    }
                }

            }}>
                <ImageBackground source={img} style={[styles.jinsha, {
                    flexDirection: "column-reverse"
                }]}>
                    <View activeOpacity={1}
                          style={[styles.txt_view, {backgroundColor: '#101010', opacity: 0.78}]}>
                        <Text style={styles.txt1} numberOfLines={1}>{item.name}</Text>
                        <View style={{flex: 1}}/>
                        {/*<Image*/}
                        {/*style={{height: px2dp(48), width: px2dp(40),marginRight:17}}*/}
                        {/*source={Images.location}*/}
                        {/*/>*/}
                    </View>
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

                <PopAction
                    btnShow={true}
                    ref={ref => this.popAction = ref}
                    btnArray={this.popActions()}/>
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

    popActions = () => {
        const {name, location, amap_poiid, amap_navigation_url, amap_location} = this.state.current_item;
        let reportList = [{id: 0, name: global.lang.t('Gaode'), type: 'gaode'}, {
            id: 1,
            name: global.lang.t('iphone_map'),
            type: 'pingguo'
        }];
        let resultArray = [];
        reportList.forEach((data, index) => {
            let item = {
                name: data.name, txtStyle: {color: '#4A90E2'}, onPress: () => {
                    if (strNotNull(amap_navigation_url)) {
                        this.popAction.toggle();
                        turn2MapMark(amap_location, amap_navigation_url, amap_poiid, location, name, data.type)
                    }

                }
            };
            resultArray.push(item);
        });
        resultArray.push({
            name: global.lang.t('cancel'),
            txtStyle: {color: "#AAAAAA"},
            onPress: () => this.popAction.toggle()
        });

        return resultArray;
    };
}
