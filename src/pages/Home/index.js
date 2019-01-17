import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {logMsg} from "../../utils/utils";
import MainBanner from './MainBanner';
import styles from './index.style';
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {Metrics} from "../../configs/Theme";
import Picker from 'react-native-wheel-picker'
import SelectPiker from "../comm/SelectPiker";

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
                <TouchableOpacity>
                    <Text style={styles.more_txt}>{global.lang.t('more')}</Text>
                </TouchableOpacity>
            </View>
        )
    };
    _renderItem = (item, index) => {
        return (
            <View style={styles.item_view}>
                <Image style={styles.race_img}
                       source={{uri: 'https://cdn-upyun.deshpro.com/kk/uploads/banner/64aaf57f7701d04761cedcc4210a7a65.jpg'}}/>
                <View style={styles.right_view}>
                    <Text style={styles.race_content_txt} numberOfLines={2}>TPTS中扑免费专属赛，20万奖池门票等你抢！</Text>
                    <View style={styles.right_bottom_view}>
                        <Text style={[styles.bottom_txt, {marginRight: 10}]}>#中扑网</Text>
                        <Text style={styles.bottom_txt}>04-21</Text>
                    </View>
                </View>
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

        return (
            <ScrollView style={styles.home_view}>
                <MainBanner/>
                <View style={styles.active_type_view}>
                    <TouchableOpacity style={styles.active_btn}>
                        <Text style={styles.active_txt}>{global.lang.t('race')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.active_btn}>
                        <Text style={styles.active_txt}>{global.lang.t('cash_table')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.middle_view}>

                </View>

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
