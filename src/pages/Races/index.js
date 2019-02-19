import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, Styles} from "../../configs/Theme";
import Carousel from 'react-native-snap-carousel';
import {Metrics} from "../../configs/Theme";
import RaceModal from './RaceModal';
import {mainEvents} from "../../services/eventsDao";
import {logMsg, unix_format} from "../../utils/utils";

@connect(({Races}) => ({
    ...Races,
}))
export default class Races extends Component {

    state = {
        list_show: false,
        events:[],
        recent_event:{}
    }

    componentDidMount() {
        mainEvents(data=>{
            const {events,recent_event} = data

            this.setState({
                events,
                recent_event
            })


            logMsg('主赛',data)
        })
    }

    change_list_show = () => {
        this.setState({
            list_show: !this.state.list_show
        })
    };

    topBar = () => {
        const {recent_event} = this.state
        let name = recent_event?recent_event.name:''
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
                        style={{fontSize: 18, color: '#FFE9AD'}}>{name}</Text>
                    <Image style={{width: 12, height: 6, marginLeft: 10}}
                           source={this.state.list_show ? Images.top : Images.bottom}/>
                </TouchableOpacity>
                <View style={styles.left2}/>
            </View>
        )
    };


    _renderItem = ({item, index}) => {
        return <Card
        item={item}/>
    };

    render() {
        const {events} = this.state
        return (
            <View style={styles.race_view}>
                {this.topBar()}
                {events && events.length>0?<View style={styles.carousel_view}>
                    <Carousel
                        loop
                        layout={'default'}
                        ref={(c) => {
                            this._carousel = c
                        }}
                        data={events}
                        renderItem={this._renderItem}
                        sliderWidth={Metrics.screenWidth}
                        itemWidth={Metrics.screenWidth - 80}
                    />
                </View>:null}

                {this._item(styles.item_view, Images.rili_gray, styles.img_dy,
                    'OPC2019赛程表', () => {
                        router.toRaceSchedule();
                    })}
                {this._item(styles.item_view, Images.zixun, styles.img_dy,
                    global.lang.t('race_message'), () => {


                    })}
                {this._item(styles.item_view, Images.ziyuan, styles.img_dy,
                    global.lang.t('race_news'), () => {
                        router.toRaceNew();
                    })}

                <RaceModal
                    data={events}
                    ref={ref => this.raceModal = ref}/>
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


class Card extends Component{

    state = {
        countTime:''
    }

    counting = (startTime,endTime)=>{
        this.intervalTimer = setInterval(() => {
            // 得到剩余时间
            let remainTime = this.getRemainTime(startTime)

            // 倒计时
            if ( remainTime.total > 0) {
                let countTime = `${remainTime.days}天${remainTime.hours}时${remainTime.minutes}分${remainTime.seconds}秒`
                this.setState({
                    countTime
                })
                //倒计时结束
            } else if (remainTime.total <= 0) {
                clearInterval(this.intervalTimer);
                let toEndTime = this.getRemainTime(endTime)
                let raceStatus = '进行中'
                if(toEndTime.total<0){
                    raceStatus = '已结束'
                }
                this.setState({
                    countTime:raceStatus
                })
            }
        }, 1000)
    }

    getRemainTime = (endTime) => {
        let t = endTime - Date.parse(new Date())
        let seconds = Math.floor((t / 1000) % 60)
        let minutes = Math.floor((t / 1000 / 60) % 60)
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
        let days = Math.floor(t / (1000 * 60 * 60 * 24))
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }



    render(){
        const {begin_time,end_time,id,logo,name} = this.props.item
        let race_start_time = unix_format(begin_time,'YYYY年MM月DD日')

        return (
            <View style={styles.slide_view}>
                <View style={styles.slide_top_view}>
                    <Text style={styles.race_time_txt}>{global.lang.t('race_time')}</Text>
                    <Text style={styles.race_time_txt}>{this.state.countTime}</Text>
                </View>
                <Image
                    style={styles.slide_img}
                    source={{uri: "https://cdn-upyun.deshpro.com/kk/uploads/banner/64aaf57f7701d04761cedcc4210a7a65.jpg"}}/>
                <View style={styles.slide_top_view}>
                    <Text style={styles.race_time_txt2}>{name}</Text>
                    <Text style={styles.race_time_txt}>{race_start_time}</Text>
                </View>
            </View>
        )
    }

    componentDidMount(){
        const {begin_time,end_time} = this.props.item
        this.counting(begin_time*1000,end_time*1000)
    }

    componentWillUnmount(){
        this.intervalTimer && clearInterval(this.intervalTimer);
    }
}
