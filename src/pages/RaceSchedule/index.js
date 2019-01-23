import React, {Component} from 'react';
import {View, Text,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import Carousel from 'react-native-snap-carousel';
import {Images, Metrics} from "../../configs/Theme";
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';


@connect(({RaceSchedule}) => ({
    ...RaceSchedule,
}))
export default class RaceSchedule extends Component {

    state = {
        select_index: 0,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }


    componentDidMount() {

    }

    carousel_Item = ({item, index}) => {
        const {select_index} = this.state;
        return (
            <View style={select_index === index ? styles.item_select_view : styles.item_view}>
                <Text></Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.schedule_view}>
                <View style={styles.carousels_view}>
                    <Carousel
                        layout={'default'}
                        ref={(c) => {
                            this._carousel = c
                        }}
                        data={this.state.data}
                        renderItem={this.carousel_Item}
                        sliderWidth={Metrics.screenWidth}
                        itemWidth={64}
                    />
                </View>

                <View style={{backgroundColor: 'white'}}>
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
                        allLoadedText={global.lang.t('no_more')}
                        waitingSpinnerText={global.lang.t('loading')}
                        emptyView={() => <View/>}
                    />
                </View>

            </View>
        )
    }

    _renderItem=(item,index)=>{
        return(
            <View style={styles.item_view2}>
                <Text style={styles.top_txt1}>#1 NL Hold'em-reezeout(1)</Text>
                <TouchableOpacity style={styles.schedule_middle_view} activeOpacity={1}>
                    <Text style={[styles.top_txt1,{marginRight:20}]}>{global.lang.t('race')}#1</Text>
                    <Text style={styles.time_txt}>2018/12/23 12:30</Text>
                    <View style={{flex:1}}/>
                    <Image style={{width:12,height:6}} source={Images.is_bottom}/>
                </TouchableOpacity>
                <View style={styles.schedule_bottom_view}>
                    <Text style={styles.top_txt1}>NL Hold'em-reezeout…</Text>
                    <View style={{flex:1}}/>
                    <Text style={styles.race_price}>{global.lang.t('race_price')}¥1，200</Text>
                </View>
            </View>
        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {

            startFetch([1, 2, 3], 16)
        } catch (err) {
            abortFetch();
        }
    };

    _separator = () => {
        return (
            <View
                style={{height: 6, backgroundColor: "#ECECEE", width: Metrics.screenWidth}}/>
        )
    }
}
