import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, ScrollView,RefreshControl,ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {logMsg} from "../../utils/utils";
import MainBanner from './MainBanner';
import styles from './index.style';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {Images, Metrics} from "../../configs/Theme";
import SelectPiker from "../comm/SelectPiker";
import HotItem from "./HotItem";
import {Actions} from "react-native-router-flux";

@connect(({Home}) => ({
    ...Home
}))
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 1,
            itemList: ['English', '简体中文', '繁体中文']
        };
        props.navigation.setParams({
            onRight:()=>{
                this.selectPiker && this.selectPiker.toggle()
            },
            onLeft:()=>{
                Actions.drawerOpen()
            }
        })
    }


    componentDidMount() {
        const {dispatch, navigation} = this.props
        dispatch({type: 'Home/effectsDemo'})
        logMsg(this)
    };

    onPickerSelect=(index)=> {
        this.setState({
            selectedItem: index,
        })
    };


    header = () => {
        return (
            <View style={styles.header_view}>
                <Text style={styles.hot_race_txt}>{global.lang.t('hot_race')}</Text>
                <View style={{flex: 1}}/>
                <TouchableOpacity onPress={()=>{
                    router.toHotRaceList();
                }}
                style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.more_txt}>{global.lang.t('more')}</Text>
                    <Image style={{width:6,height:12,marginLeft:8}} source={Images.is_right}/>
                </TouchableOpacity>
            </View>
        )
    };
    _renderItem = (item, index) => {
        return (
            <HotItem item={item}/>
        )
    };

    _separator = () => {
        return (
            <View
                style={{height: 1, backgroundColor: "#ECECEE", width: Metrics.screenWidth - 34, alignSelf: 'center'}}/>
        )
    }

    render() {

        return (
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                />}
                style={styles.home_view}>
                <MainBanner/>
                <View style={styles.active_type_view}>
                    <TouchableOpacity onPress={()=>{
                        router.toRaces();
                    }}>
                        <ImageBackground source={Images.race_img} style={styles.active_btn}>
                            <Text style={styles.active_txt}>{global.lang.t('race')}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        router.toCashTable();
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

                <View style={styles.hot_race_view}>
                    <UltimateFlatList
                        header={this.header}
                        firstLoader={true}
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
                        emptyView={() => <View/>}
                    />
                </View>

                <Button
                    onPress={() => {
                        router.toLogin()
                    }}
                    title={'跳转到登录'}/>

                <SelectPiker
                    ref={ref => this.selectPiker = ref}
                    onPickerSelect={this.onPickerSelect}
                    selectedItem={this.state.selectedItem}
                    itemList={this.state.itemList}/>

            </ScrollView>
        )
    }

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {

            startFetch([1, 2, 3], 16)
        } catch (err) {
            abortFetch();
        }
    };
}
