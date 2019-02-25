import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, ScrollView, RefreshControl, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import { isEmptyObject, logMsg} from "../../utils/utils";
import MainBanner from './MainBanner';
import styles from './index.style';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {Images, Metrics} from "../../configs/Theme";
import SelectPiker from "../comm/SelectPiker";
import HotItem from "./HotItem";
import {Actions} from "react-native-router-flux";
import {getHomeBanners, getInfoList,initLoginUser} from '../../services/accountDao'
import CustomModal from "../../components/CustomModal";
import codePush from "react-native-code-push";
import ShareToast from "../comm/ShareToast";
import NotData from "../comm/NotData";

@connect(({Home}) => ({
    ...Home
}))
@codePush
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 1,
            itemList: ['English', '简体中文', '繁体中文'],
            home_banners: [],
            info_list: [],
            isRefreshing:false
        };
        props.navigation.setParams({
            onRight: () => {
                this.selectPiker && this.selectPiker.toggle()
            },
            onLeft: () => {
                Actions.drawerOpen()
            }
        })
        this.count = 0
    };

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.listView && this.listView.refresh();
            this.setState({isRefreshing: false});
        }, 1000)
    };

    componentDidMount() {
        setTimeout(() => {
            if (isEmptyObject(global.loginUser)) {
                router.toLogin()
            }
        }, 1000);
        codePush.disallowRestart()
        codePush.sync({
            updateDialog: false,
            installMode: codePush.InstallMode.ON_NEXT_RESUME
        })
    };

    onPickerSelect = (index) => {
        this.setState({
            selectedItem: index,
        })
    };


    header = () => {
        return (
            <View style={styles.header_view}>
                <Text style={styles.hot_race_txt}>{global.lang.t('hot_race')}</Text>
                <View style={{flex: 1}}/>
                <TouchableOpacity onPress={() => {
                    router.toHotRaceList();
                }}
                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.more_txt}>{global.lang.t('more')}</Text>
                    <Image style={{width: 6, height: 12, marginLeft: 8}} source={Images.is_right}/>
                </TouchableOpacity>
            </View>


        )
    };
    _renderItem = (item, index) => {
        return (
            <View style={{backgroundColor:'white'}}>
                <HotItem item={item}/>
            </View>
        )
    };

    _separator = () => {
        return (
            <View
                style={{height: 1, backgroundColor: "#ECECEE", width: Metrics.screenWidth - 34, alignSelf: 'center'}}/>
        )
    }

    render() {
        const {shareParam} = this.props
        logMsg(this.props)
        return (
            <ScrollView
                style={styles.home_view}
                refreshControl={<RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                />}>

                <MainBanner home_banners={this.state.home_banners}/>
                <View style={styles.active_type_view}>
                    <TouchableOpacity activeOpacity={1}  onPress={() => {
                        if(isEmptyObject(global.loginUser)){
                            router.toLogin();
                        }else{
                            router.toRaces();
                        }
                    }}>
                        <ImageBackground source={Images.race_img} style={styles.active_btn}>
                            <Text style={styles.active_txt}>{global.lang.t('race')}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}  onPress={() => {
                        if(isEmptyObject(global.loginUser)){
                            router.toLogin();
                        }else{
                            router.toCashTable();
                        }
                    }}>
                        <ImageBackground source={Images.xianjinzhuo} style={styles.active_btn}>
                            <Text style={styles.active_txt}>{global.lang.t('cash_table')}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <ImageBackground style={styles.middle_view} source={Images.other_more}>
                    <Text style={styles.into_poker_txt}>{global.lang.t('into_poker')}</Text>
                    <Text style={styles.found_beauti_txt}>{global.lang.t('found_beauti')}</Text>
                </ImageBackground>

                <UltimateFlatList
                    header={this.header}
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

                <SelectPiker
                    ref={ref => this.selectPiker = ref}
                    onPickerSelect={this.onPickerSelect}
                    selectedItem={this.state.selectedItem}
                    itemList={this.state.itemList}/>

                {!isEmptyObject(shareParam) ? <ShareToast hiddenShareAction={() => {
                    this.props.dispatch({type:'Home/closeShare'})
                }}

                                                           shareTitle={shareParam.shareTitle}
                                                           shareText={shareParam.shareText}
                                                           shareLink={shareParam.shareLink}
                                                           shareImage={shareParam.shareImage}
                                                           shareType={shareParam.shareType}/> : null}
            </ScrollView>
        )
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            initLoginUser(() => {
                getHomeBanners(data => {
                    this.setState({
                        home_banners: data.banners
                    })
                    getInfoList({
                        page,
                        page_size: 20
                    }, data => {
                        logMsg("InfoList:", data)
                        startFetch(data.infos, 18)
                    }, err => {
                        logMsg("reject:", err)
                        abortFetch()
                    })

                });
            })

        } catch (err) {
            abortFetch();
        }
    };
}
