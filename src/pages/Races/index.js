import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, Styles} from "../../configs/Theme";
import Carousel from 'react-native-snap-carousel';
import {Metrics} from "../../configs/Theme";
import RaceModal from './RaceModal';
import {mainEvents} from "../../services/eventsDao";
import {getBg, logMsg, unix_format, getRemainTime, isStrNull} from "../../utils/utils";
import ImageLoad from "../../components/ImageLoad";
import RaceMessage from "../RaceMessage";

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
            let all = [];
            all.push(data.recent_event);
            data.events.map(item => {
                if (item.id !== data.recent_event.id) {
                    all.push(item);
                }
            });
            this.setState({
                events: data.events,
                recent_event: data.recent_event,
                all_events: all
            })
        })
    }

    change_recent_event = (recent_event) => {
        const {all_events} = this.state;


        all_events.forEach((item,index) => {
          if(item.id === recent_event.id){
              this._carousel && this._carousel.snapToItem(index)
          }
        });
        this.setState({
            recent_event: recent_event
        })
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
                        this.change_list_show()
                    }}>
                    <Text
                        style={{fontSize: 18, color: '#FFE9AD'}}
                        numberOfLines={1}>{this.state.recent_event.name}</Text>
                    <Image style={{width: 12, height: 6, marginLeft: 10}}
                           source={this.state.list_show ? Images.top : Images.bottom}/>
                </TouchableOpacity>
                <View style={{width: 35}}/>
            </View>
        )
    };


    _renderItem = ({item, index}) => {
        return <Card
            item={item} recent_event={this.state.recent_event}/>
    };

    render() {
        const {events, recent_event, all_events} = this.state;
        return (
            <View style={styles.race_view}>
                {this.topBar()}
                {all_events && all_events.length > 0 ? <View style={styles.carousel_view}>
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
                        onSnapToItem={(index) => {
                            let selectedEvent = all_events[index];
                            logMsg('滚动到了', selectedEvent);
                            this.setState({
                                recent_event: selectedEvent
                            })
                        }}
                    />
                </View> : null}

                {this._item(styles.item_view, Images.rili_gray, styles.img_dy1,
                    `${isStrNull(recent_event.name) ? '' : recent_event.name}${global.lang.t('race_schedule')}`, () => {
                        router.toRaceSchedule(recent_event);
                    })}
                {this._item(styles.item_view, Images.zixun, styles.img_dy,
                    global.lang.t('race_message'), () => {
                        router.toRaceMessage(recent_event.id)
                    })}
                {this._item(styles.item_view, Images.ziyuan, styles.img_dy2,
                    global.lang.t('race_news'), () => {
                        router.toRaceNew(recent_event.id);
                    })}

                <RaceModal ref={ref => this.raceModal = ref} recent_event={recent_event} events={events}
                           change_recent_event={this.change_recent_event}
                           change_list_show={this.change_list_show}/>
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


class Card extends Component {

    state = {
        countTime: ''
    }

    counting = (startTime, endTime) => {
        this.intervalTimer = setInterval(() => {
            // 得到剩余时间
            let remainTime = getRemainTime(startTime)

            // 倒计时
            if (remainTime.total > 0) {
                let countTime = `${remainTime.days}${global.lang.t('day')}${remainTime.hours}${global.lang.t('time')}${remainTime.minutes}${global.lang.t('minute')}${remainTime.seconds}${global.lang.t('second')}`
                this.setState({
                    countTime
                })
                //倒计时结束
            } else if (remainTime.total <= 0) {
                clearInterval(this.intervalTimer);
                let toEndTime = getRemainTime(endTime)
                let raceStatus = global.lang.t('processing')
                if (toEndTime.total < 0) {
                    raceStatus = global.lang.t('over')
                }
                this.setState({
                    countTime: raceStatus
                })
            }
        }, 1000)
    };

    debouncePress =(id) => {
        const clickTime = Date.now()
        if (!this.lastClickTime ||
            Math.abs(this.lastClickTime - clickTime) > 1000) {
            this.lastClickTime = clickTime
            router.toRaceMessage(id)
        }
    }


    render() {
        const {description,id} = this.props.recent_event;
        const {begin_time, end_time,logo, name} = this.props.item;
        let month = unix_format(begin_time, `MM`);

        let race_start_time = global.localLanguage === 'en' ? `${global.lang.t(`month${month}`)}`+unix_format(begin_time,` MM,YYYY`) :
            unix_format(begin_time, `YYYY${global.lang.t('year')}MM${global.lang.t('month')}DD${global.lang.t('day2')}`);

        return (
            <TouchableOpacity activeOpacity={1} style={styles.slide_view} onPress={() => {
                this.debouncePress(id);
            }}>
                <View style={styles.slide_top_view}>
                    <Text style={styles.race_time_txt}>{global.lang.t('race_time')}</Text>
                    <Text style={styles.race_time_txt}>{this.state.countTime}</Text>
                </View>
                <Image
                    style={styles.slide_img}
                    source={getBg(logo)}/>
                <View style={styles.slide_top_view}>
                    <Text style={styles.race_time_txt2}>{name}</Text>
                    <Text style={styles.race_time_txt}>{race_start_time}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        const {begin_time, end_time} = this.props.item
        this.counting(begin_time * 1000, end_time * 1000)
    }

    componentWillUnmount() {
        this.intervalTimer && clearInterval(this.intervalTimer);
    }
}
