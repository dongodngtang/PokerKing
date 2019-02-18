import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, Styles} from "../../configs/Theme";
import Carousel from 'react-native-snap-carousel';
import {Metrics} from "../../configs/Theme";
import RaceModal from './RaceModal';
import {mainEvents} from "../../services/eventsDao";
import {logMsg, utcDate, getAvatar} from "../../utils/utils";

@connect(({Races}) => ({
    ...Races,
}))
export default class Races extends Component {

    state = {
        list_show: false,
        events: [],
        recent_event: {},
        all_events: []
    };

    componentDidMount() {
        mainEvents(data => {
            logMsg('主赛', data);
            let events_obj = [];
            events_obj.push(data.recent_event);
            data.events.map(item => {
                events_obj.push(item)
            });
            logMsg("events_obj",events_obj)
            this.setState({
                events: data.events,
                recent_event: data.recent_event,
                all_events: events_obj
            })
        })
    }

    change_recent_event = (event) => {

    };

    change_list_show = () => {
        this.setState({
            list_show: !this.state.list_show
        })
    };

    topBar = () => {
        return (
            <View style={styles.navTop}>
                <TouchableOpacity
                    onPress={() => {
                        router.pop()
                    }}
                    style={styles.left2}>
                    <Image
                        style={{height: 14, width: 18}}
                        source={Images.left}
                    />

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navTitle}
                    onPress={() => {
                        this.raceModal && this.raceModal.toggle();
                        this.change_list_show();
                    }}>
                    <Text
                        style={{fontSize: 18, color: '#FFE9AD'}}  numberOfLines={1}>{this.state.recent_event.name}</Text>
                    <Image style={{width: 12, height: 6, marginLeft: 10}}
                           source={this.state.list_show ? Images.top : Images.bottom}/>
                </TouchableOpacity>
                <View style={{width:35}}/>
            </View>
        )
    };

    _renderItem = ({item, index}) => {
        const {name, logo, begin_time, end_time, description} = item;
        return (
            <View style={styles.slide_view}>
                <View style={styles.slide_top_view}>
                    <Text style={styles.race_time_txt}>{global.lang.t('race_time')}</Text>
                    <Text style={styles.race_time_txt}>99天02时23分34秒</Text>
                </View>
                <Image
                    style={styles.slide_img}
                    source={{uri: getAvatar(logo)}}/>
                <View style={styles.slide_top_view}>
                    <Text style={styles.race_time_txt2}>{name}</Text>
                    <Text style={styles.race_time_txt}>{utcDate(begin_time, 'YYYY.MM.DD')}</Text>
                </View>
            </View>
        );
    };

    render() {
        const {recent_event} = this.state;
        return (
            <View style={styles.race_view}>
                {this.topBar()}
                <View style={styles.carousel_view}>
                    <Carousel
                        loop
                        layout={'default'}
                        ref={(c) => {
                            this._carousel = c
                        }}
                        data={this.state.all_events}
                        renderItem={this._renderItem}
                        sliderWidth={Metrics.screenWidth}
                        itemWidth={Metrics.screenWidth - 80}
                    />
                </View>
                {this._item(styles.item_view, Images.rili_gray, styles.img_dy,
                    `OPC2019${global.lang.t('race_schedule')}`, () => {
                        router.toRaceSchedule(recent_event.id);
                    })}
                {this._item(styles.item_view, Images.zixun, styles.img_dy,
                    global.lang.t('race_message'), () => {


                    })}
                {this._item(styles.item_view, Images.ziyuan, styles.img_dy,
                    global.lang.t('race_news'), () => {
                        router.toRaceNew(recent_event.id);
                    })}

                <RaceModal ref={ref => this.raceModal = ref}/>
            </View>
        )
    }

    _item = (itemStyle, img, imgStyle, title, onPress) => {
        const {profile} = this.props;
        return <TouchableOpacity
            activeOpacity={1}
            style={itemStyle} onPress={onPress}>
            <Image style={imgStyle} source={img}/>
            <Text style={styles.personalText}>{title}</Text>
            <View style={{flex: 1}}/>

            <Image style={styles.personalImg} source={Images.is_right}/>
        </TouchableOpacity>
    };
}
