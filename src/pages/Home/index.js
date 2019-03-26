import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, ScrollView, RefreshControl, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {isEmptyObject, logMsg} from "../../utils/utils";
import MainBanner from './MainBanner';
import styles from './index.style';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {Images, Metrics} from "../../configs/Theme";
import SelectPiker from "../comm/SelectPiker";
import HotItem from "./HotItem";
import {Actions} from "react-native-router-flux";
import {getHomeBanners, getInfoList, initLoginUser} from '../../services/accountDao'
import CustomModal from "../../components/CustomModal";
import codePush from "react-native-code-push";
import ShareToast from "../comm/ShareToast";
import NotData from "../comm/NotData";
import FoundBeauti from "../FoundBeauti";
import ControlPanel from "./Drawer";
import Drawer from 'react-native-drawer'

const WIDTH = Metrics.screenWidth;
const HEIGHT = Metrics.screenHeight;

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}

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
            isRefreshing: false
        };
        props.navigation.setParams({
            onRight: () => {
                this.selectPiker && this.selectPiker.toggle()
            },
            onLeft: () => {
                this.drawer && this.drawer.toggle()
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
            <View style={{backgroundColor: '#252527'}}>
                <HotItem item={item} type={'hot'}/>
            </View>
        )
    };

    _separator = () => {
        return (
            <View
                style={{height: 1, backgroundColor: "#484848", width: Metrics.screenWidth - 34, alignSelf: 'center'}}/>
        )
    }

    render() {
        const {shareParam} = this.props;
        return (
            <Drawer
                ref={ref=>this.drawer = ref}
                type="static"
                content={<ControlPanel
                                 profile={this.props.profile}/>}
                openDrawerOffset={100}
                tweenHandler={Drawer.tweenPresets.parallax}>
                <ScrollView
                    style={styles.home_view}
                    refreshControl={<RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                    />}>

                    <MainBanner home_banners={this.state.home_banners}/>
                    <View style={styles.active_type_view}>
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            if (isEmptyObject(global.loginUser)) {
                                router.toLogin();
                            } else {
                                router.toRaces();
                            }
                        }} style={styles.active_btn}>
                            {/*<ImageBackground source={Images.touanament_bg} style={styles.active_btn}>*/}
                            <Image source={Images.touanament_bg}
                                   style={styles.touanament_img}/>
                            <Text style={styles.active_txt}>{global.lang.t('race')}</Text>
                            {/*</ImageBackground>*/}
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            if (isEmptyObject(global.loginUser)) {
                                router.toLogin();
                            } else {
                                router.toCashTable();
                            }
                        }} style={styles.active_btn}>
                            {/*<ImageBackground source={Images.cash_bg} style={styles.active_btn}>*/}
                            <Image source={Images.cash_bg}
                                   style={styles.touanament_img}/>
                            <Text style={styles.active_txt}>{global.lang.t('cash_table')}</Text>
                            {/*</ImageBackground>*/}
                        </TouchableOpacity>
                    </View>
                    {/*<TouchableOpacity activeOpacity={1} onPress={()=>{*/}
                    {/*router.toFoundBeauti()*/}
                    {/*}}>*/}
                    {/*<ImageBackground style={styles.middle_view} source={Images.other_more}>*/}
                    {/*<Text style={styles.into_poker_txt}>{global.lang.t('into_poker')}</Text>*/}
                    {/*<Text style={styles.found_beauti_txt}>{global.lang.t('found_beauti')}</Text>*/}
                    {/*</ImageBackground>*/}
                    {/*</TouchableOpacity>*/}

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
                        this.props.dispatch({type: 'Home/closeShare'})
                    }}

                                                              shareTitle={shareParam.shareTitle}
                                                              shareText={shareParam.shareText}
                                                              shareLink={shareParam.shareLink}
                                                              shareImage={shareParam.shareImage}
                                                              shareType={shareParam.shareType}/> : null}

                </ScrollView>


            </Drawer>
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
                        startFetch(data.infos, 20)
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
