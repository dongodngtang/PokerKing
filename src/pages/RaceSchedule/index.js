import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, Metrics, realSize} from "../../configs/Theme";
import UltimateFlatList from '../../components/ultimate/UltimateFlatList';
import {isEmptyObject, logMsg, utcDate, moneyFormat, showToast, getRemainTime} from "../../utils/utils";
import moment from 'moment';
import {getSchedulesDates, getSchedulesEvents} from '../../services/raceDao'
import * as AddCalendarEvent from 'react-native-add-calendar-event';

@connect(({RaceSchedule}) => ({
    ...RaceSchedule,
}))
export default class RaceSchedule extends Component {

    constructor(props) {
        super(props)

        this.state = {
            schedules_dates: [],
            schedules_events: []
        }
    };


    componentDidMount() {
        getSchedulesDates({event_id: this.props.params.event_id}, data => {
            let dates = [];
            data.dates.map((item, index) => {
                dates.push({id: index, date: item, isSelect: index === 0})
            });
            logMsg("schedules_dates", dates);
            this.setState({
                schedules_dates: dates
            })
            this.ultRefresh()
        }, err => {
            logMsg("schedules_dates_err", err)
        })
    }


    ultRefresh = () => {
        setTimeout(() => {
            this.listView && this.listView.refresh()
        }, 500)
    }

    carousel_Item = ({item, index}) => {
        const {schedules_dates} = this.state;
        let week = moment(item.date).format('E');
        let day = moment(item.date).format('MM-DD');
        return (
            <TouchableOpacity style={item.isSelect ? styles.item_select_view : styles.item_view}
                              onPress={() => {
                                  schedules_dates.forEach((x) => {
                                      x.isSelect = item.id === x.id
                                  });
                                  this.setState({
                                      schedules_dates: [...schedules_dates]
                                  });
                                  this.ultRefresh()
                              }}>
                <Text style={styles.day_txt}>{day}</Text>
                <Text style={styles.week_txt}>{global.lang.t(`week${week}`)}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const {schedules_dates} = this.state;
        return (
            <ScrollView style={styles.schedule_view}>
                <View style={styles.carousels_view}>
                    <FlatList
                        keyExtractor={(item, index) => `date_${index}`}
                        horizontal
                        data={schedules_dates}
                        ItemSeparatorComponent={() => <View style={{width: realSize(5), height: realSize(66)}}/>}
                        renderItem={this.carousel_Item}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={{backgroundColor: 'white'}}>
                    <UltimateFlatList
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
        const {schedules_events} = this.state;
        const {name, event_type, event_num, buy_in, entries, starting_stack, schedule_pdf, begin_time, reg_open, reg_close} = item;
        return (
            <View>
                <View style={styles.item_view2}>
                    <Text style={styles.top_txt1}>#{name}</Text>
                    <TouchableOpacity style={styles.schedule_middle_view} activeOpacity={1} onPress={() => {
                        schedules_events.forEach((x) => {
                            if (x.id === item.id) {
                                x.isSelect = !x.isSelect
                            }
                        });
                        this.setState({
                            schedules_events: [...schedules_events]
                        });
                    }}>
                        <Text style={[styles.top_txt1, {marginRight: 20}]}>{global.lang.t('race')}{event_num}</Text>
                        <Text style={styles.time_txt}>{utcDate(begin_time, 'YYYY/MM/DD MM:ss')}</Text>
                        <View style={{flex: 1}}/>
                        <Image style={{width: 12, height: 6}}
                               source={item.isSelect ? Images.is_top : Images.is_bottom}/>
                    </TouchableOpacity>
                    <View style={styles.schedule_bottom_view}>
                        <Text style={[styles.top_txt1, {width: '65%'}]} numberOfLines={1}>{name}</Text>
                        <View style={{flex: 1}}/>
                        <Text style={styles.race_price}>{global.lang.t('race_price')}{buy_in}</Text>
                    </View>
                </View>
                {item.isSelect ? <SelectPart item={item}/> : null}
            </View>

        )
    };

    onFetch = (page = 1, startFetch, abortFetch) => {
        const {schedules_dates} = this.state;
        if (isEmptyObject(schedules_dates)) {
            return;
        }
        try {
            schedules_dates.forEach((item) => {
                if (item.isSelect) {
                    getSchedulesEvents({
                        event_id: this.props.params.event_id,
                        date: moment(item.date).format('YYYY-MM-DD')
                    }, data => {
                        logMsg("SchedulesEvents", data);
                        let events = data.schedules;
                        events.map((event) => {
                            event.isSelect = false
                        });
                        this.setState({
                            schedules_events: events
                        })
                        startFetch(events, 18)
                    })
                }
            });
        } catch (err) {
            abortFetch();
        }
    };

    _separator = () => {
        return (
            <View
                style={{height: 4, backgroundColor: "#ECECEE", width: Metrics.screenWidth}}/>
        )
    }
}

class SelectPart extends Component {
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
    }
    render() {
        const {name, event_type, event_num, buy_in, entries, starting_stack, schedule_pdf, begin_time, reg_open, reg_close} = this.props.item;;
        return (
            <View style={styles.selected_view}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 17, marginRight: 17}}>
                    <Text style={[styles.top_txt1, {marginRight: 8}]}>{global.lang.t("race_people")}</Text>
                    <Text style={{color: "#888888", fontSize: 14}}>{entries}</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.selected_middle_view}>
                    <View style={styles.cloumn_view}>
                        <Text style={styles.top_txt1}>{global.lang.t("start_registration")}</Text>
                        <Text style={styles.top_txt2}>{utcDate(reg_open, 'YY/MM/DD MM:ss')}</Text>
                    </View>
                    <View style={styles.cloumn_view}>
                        <Text style={styles.top_txt1}>{global.lang.t("end_registration")}</Text>
                        <Text style={styles.top_txt2}>{utcDate(reg_close, 'YY/MM/DD MM:ss')}</Text>
                    </View>
                    <View style={styles.cloumn_view}>
                        <Text style={styles.top_txt1}>{global.lang.t("end_distance")}</Text>
                        <Text style={styles.top_txt2}>{this.state.countTime}</Text>
                    </View>
                </View>
                <View style={styles.line}/>
                <View style={styles.selected_bottom_view}>
                    <View style={styles.cloumn_view}>
                        <Text style={styles.top_txt1}>{global.lang.t("type")}</Text>
                        <Text style={styles.top_txt2}>{event_type}</Text>
                    </View>
                    <View style={styles.cloumn_view}>
                        <Text style={styles.top_txt1}>{global.lang.t("starting_chip")}</Text>
                        <Text style={styles.top_txt2}>{moneyFormat(starting_stack)}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.structure_view} onPress={() => {
                    router.toStructure(schedule_pdf)
                }}>
                    <Text style={styles.structure_txt}>{global.lang.t('structure')}</Text>
                    <View style={{flex: 1}}/>
                    <Image style={{width: 6, height: 12}} source={Images.right_gray}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.problem_view} activeOpacity={1}>
                    <Image style={{width: 26, height: 26, marginRight: 14}} source={Images.shuhcu}/>
                    <Text style={styles.problem_txt}>{global.lang.t('enter_information')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        let s = utcDate(begin_time, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                        let eventConfig = {
                            title: name,
                            startDate: s,
                            endDate: s,
                            allDay: true
                        }
                        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
                            .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
                                showToast(global.lang.t('add_schedule'))
                                console.log(JSON.stringify(eventInfo));
                            })
                            .catch((error: string) => {
                                // handle error such as when user rejected permissions
                                console.warn(error);
                            });
                    }}
                    style={styles.calendar_view} activeOpacity={1}>
                    <Image style={{width: 24, height: 24, marginRight: 16}} source={Images.jiegou}/>
                    <Text style={styles.problem_txt}>{global.lang.t('add_calendar')}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    componentDidMount() {
        const {reg_open, reg_close} = this.props.item;
        this.counting(reg_open * 1000, reg_close * 1000)
    }

    componentWillUnmount() {
        this.intervalTimer && clearInterval(this.intervalTimer);
    }
}
