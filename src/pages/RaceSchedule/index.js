import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import Carousel from 'react-native-snap-carousel';
import {Images, Metrics} from "../../configs/Theme";
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {logMsg} from "../../utils/utils";

let data2 = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];

@connect(({RaceSchedule}) => ({
    ...RaceSchedule,
}))
export default class RaceSchedule extends Component {

    state = {
        carousel_index: 0,
        data: [],

    }


    componentDidMount() {
    }

    carousel_Item = ({item, index}) => {
        const {carousel_index} = this.state;
        return (
            <View style={carousel_index === index ? styles.item_select_view : styles.item_view}>
                <Text></Text>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.schedule_view}>
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

            </ScrollView>
        )
    }

    _renderItem = (item, index) => {
        const {data} = this.state;
        return (
            <View>
                <View style={styles.item_view2}>
                    <Text style={styles.top_txt1}>#1 NL Hold'em-reezeout(1)</Text>
                    <TouchableOpacity style={styles.schedule_middle_view} activeOpacity={1} onPress={() => {
                        data.forEach((x) => {
                            if (x.id === index) {
                                x.isSelect = !x.isSelect
                            }
                        });
                        this.setState({
                            data: [...data]
                        });
                    }}>
                        <Text style={[styles.top_txt1, {marginRight: 20}]}>{global.lang.t('race')}#1</Text>
                        <Text style={styles.time_txt}>2018/12/23 12:30</Text>
                        <View style={{flex: 1}}/>
                        <Image style={{width: 12, height: 6}}
                               source={item.isSelect ? Images.is_top : Images.is_bottom}/>
                    </TouchableOpacity>
                    <View style={styles.schedule_bottom_view}>
                        <Text style={styles.top_txt1}>NL Hold'em-reezeout…</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.race_price}>{global.lang.t('race_price')}¥1，200</Text>
                    </View>
                </View>
                {item.isSelect ? <View style={styles.selected_view}>
                    <Text style={styles.top_txt1}>{global.lang.t("race_people")}</Text>
                    <View style={styles.line}/>
                    <View style={styles.selected_middle_view}>
                        <View style={styles.cloumn_view}>
                            <Text style={styles.top_txt1}>{global.lang.t("start_registration")}</Text>
                            <Text style={styles.top_txt2}>12月12日14:00</Text>
                        </View>
                        <View style={styles.cloumn_view}>
                            <Text style={styles.top_txt1}>{global.lang.t("end_registration")}</Text>
                            <Text style={styles.top_txt2}>12月12日14:00</Text>
                        </View>
                        <View style={styles.cloumn_view}>
                            <Text style={styles.top_txt1}>{global.lang.t("end_distance")}</Text>
                            <Text style={styles.top_txt2}>12天2时23分</Text>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.selected_bottom_view}>
                        <View style={styles.cloumn_view}>
                            <Text style={styles.top_txt1}>{global.lang.t("type")}</Text>
                            <Text style={styles.top_txt2}>Hold'em</Text>
                        </View>
                        <View style={styles.cloumn_view}>
                            <Text style={styles.top_txt1}>{global.lang.t("starting_chip")}</Text>
                            <Text style={styles.top_txt2}>50，000</Text>
                        </View>
                    </View>

                </View> : null}
            </View>

        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        try {
            data2.map((item) => {
                item.isSelect = false
            });
            this.setState({
                data: data2
            });
            startFetch(data2, 16)
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
